import Container from '@/app/components/Container';
import { getCurrentUser } from '@/actions/getCurrentUser';
import NullData from '@/app/components/NullData';
import OrderClient from './OrderClient';
import getOrdersByUserId from '@/actions/getOrdersByUserId';


const Orders = async() => {

  const currentUser = await getCurrentUser()

  if(!currentUser || currentUser.role !== 'ADMIN'){
    return <NullData title="Oops! Access Denied"/>
  }

  const orders = await getOrdersByUserId(currentUser.id)
   
  if(!orders){
    return <NullData title="No Orders yet..."/>
  }
  
  return (
    <div className='pt-8'>
      <Container>
        <OrderClient orders ={orders}/>
      </Container>
    </div>
  )
}

export default Orders;