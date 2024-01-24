import Stripe from "stripe";
import prisma from "@/libs/prismadb";
import { NextResponse } from "next/server";
import { CartProductType } from "@/app/product/[productId]/ProductDetails";
import { getCurrentUser } from "@/actions/getCurrentUser";

const stripe = new Stripe(process.env.STRIPE_SECRET_KEY as string, {
    apiVersion: "2023-10-16",
});

const calculateOrderAmount = (items: CartProductType[]) =>
    Math.floor(items.reduce((acc, item) => acc + item.price * item.quantity, 0));

export async function POST(request: Request) {
    const currentUser = await getCurrentUser();

    if (!currentUser) {
        return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
    }

    try {
        const body = await request.json();
        const { items, payment_intent_id } = body;
        const total = calculateOrderAmount(items) * 100;

        const orderData = {
            user: { connect: { id: currentUser.id } },
            amount: total,
            currency: 'usd',
            status: 'pending',
            deliveryStatus: 'pending',
            paymentIntentId: payment_intent_id,
            products: items,
        };

        if (payment_intent_id) {
            const currentIntent = await stripe.paymentIntents.retrieve(payment_intent_id);

            if (currentIntent) {
                await stripe.paymentIntents.update(payment_intent_id, { amount: total });

                const existingOrder = await prisma.order.findFirst({
                    where: { paymentIntentId: payment_intent_id },
                });

                if (existingOrder) {
                    const updatedOrder = await prisma.order.update({
                        where: { paymentIntentId: payment_intent_id },
                        data: {
                            amount: total,
                            products: items,
                        },
                    });

                    return NextResponse.json({ paymentIntent: currentIntent });
                } else {
                    return NextResponse.json(
                        { error: "Invalid Payment Intent" },
                        { status: 400 }
                    );
                }
            }
        } else {
            const paymentIntent = await stripe.paymentIntents.create({
                amount: total,
                currency: 'usd',
                automatic_payment_methods: { enabled: true },
            });

            orderData.paymentIntentId = paymentIntent.id;

            await prisma.order.create({
                data: orderData,
            });

            return NextResponse.json({ paymentIntent });
        }
    } catch (error) {
        console.error("Error:", error);
        return NextResponse.json({ error: "Internal Server Error" }, { status: 500 });
    }
}
