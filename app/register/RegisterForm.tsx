'use client'

import { useState } from "react";
import Heading from "../components/Products/Heading";
import Input from "../components/input/input";
import { FieldValues, SubmitHandler, useForm } from "react-hook-form";
import Button from "../components/button";

const RegisterForm = () => {
    const [isLoading, setIsLoading] = useState(false);
    const{register, handleSubmit, formState: {errors},} = useForm<FieldValues>({
        defaultValues: {
            name: "",
            email: "",
            password: "",
        },
    });

    const onSubmit: SubmitHandler<FieldValues> = (data)=>{
        setIsLoading(true);

    }
  return (
    <>
    <Heading title="Sign up For E-Commerce"/>
    <hr className="bg-slate-300 w-full h-px"/>
    <Input
    id="name"
    label="Name"
    disabled={isLoading}
    register={register}
    errors={errors}
    required
    />
    <Input
    id="email"
    label="Email"
    disabled={isLoading}
    register={register}
    errors={errors}
    required
    />
    <Input
    id="password"
    label="Password"
    disabled={isLoading}
    register={register}
    errors={errors}
    required
    type="password"
    />

    <Button label={isLoading? 'Is loading' : 'Sign Up'}
    onClick={handleSubmit(onSubmit)}
    />
    
    </>
  )
}

export default RegisterForm;