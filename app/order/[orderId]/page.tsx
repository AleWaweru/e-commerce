import Container from "@/app/components/Container";

import getOrderById from "@/actions/getOrderById";
import OrderDetails from "./OrderDetails";
import NullData from "@/app/components/NullData";

interface Iparams {
  orderId?: string;
}

const Order = async ({params}: {params: Iparams}) => {
    const order =  await getOrderById(params)
    if(!order) return <NullData title="No order"/>
  return (
  <div className="p-8">
      <Container>
        <OrderDetails order = {order}/>
      </Container>
    </div>
  )
}

export default Order;