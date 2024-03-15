import React from 'react'
import Container from '../components/Container';
import LoginForm from './LoginForm';
import FormWrap from '../components/FormWrap';
import { getCurrentUser } from '@/actions/getCurrentUser';

const Login  = async () => {
  const currentUser = await getCurrentUser();
  return (
    <div>
        <Container>
           <FormWrap>
            <LoginForm currentUser = {currentUser}/>
           </FormWrap>
        </Container>
    </div>
  )
}

export default Login;