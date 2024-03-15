import prisma from "@/libs/prismadb";

export default async function getOrders() {
  try {
    const orders = await prisma.order.findMany({
      include: {
        user: true,
      },
      orderBy: {
        createDate: "desc",
      },
    });
    return orders;
  } catch (error: any) {
    console.error("Error fetching orders:", error);
    throw new Error("Failed to fetch orders");
  }
}
