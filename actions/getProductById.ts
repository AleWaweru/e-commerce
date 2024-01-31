import { Prisma } from "@prisma/client";

interface Iparams{
    productId?: string
}

export default async function getProductById(params: Iparams){
    try {
        const {productId} = params;
        const product = await prisma?.product.findUnique({
            where: {
                id: productId
            },
            include:{
                reviews:{
                    include:{
                        user: true
                    },
                    orderBy:{
                        createdDate: 'desc'
                    }
                }
            }
        })

        if(!product){
            return null;
        }
        return product;
    } catch (error: any) {
        throw new Error(error)
        
    }
}