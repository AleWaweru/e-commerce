import React from 'react'
import Container from '../components/Container';
import LoginForm from './LoginForm';
import FormWrap from '../components/FormWrap';

const Login = () => {
  return (
    <div>
        <Container>
           <FormWrap>
            <LoginForm/>
           </FormWrap>
        </Container>
    </div>
  )
}

export default Login;