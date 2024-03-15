import Container from '@/app/components/Container';
import { getCurrentUser } from '@/actions/getCurrentUser';
import NullData from '@/app/components/NullData';
import getOrders from '@/actions/getOrders';
import ManageOrdersClient from './ManageOrderClient';

const ManageOrders = async() => {

  const orders = await getOrders()
  const currentUser = await getCurrentUser()

  if(!currentUser || currentUser.role !== 'ADMIN'){
    return <NullData title="Oops! Access Denied"/>
  }

  return (
    <div className='pt-8'>
      <Container>
        <ManageOrdersClient orders ={orders}/>
      </Container>
    </div>
  )
}

export default ManageOrders;