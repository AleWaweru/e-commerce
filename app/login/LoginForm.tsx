"use client";

import { useEffect, useState } from "react";
import Heading from "../components/Products/Heading";
import Input from "../components/input/input";
import { FieldValues, SubmitHandler, useForm } from "react-hook-form";
import Button from "../components/button";
import Link from "next/link";
import { AiOutlineGoogle } from "react-icons/ai";
import { signIn } from "next-auth/react";
import { useRouter } from "next/navigation";
import toast from "react-hot-toast";
import { SafeUser } from "@/types";

interface LoginProps {
  currentUser : SafeUser  | null
}

//login form
const LoginForm: React.FC<LoginProps> = ({currentUser}) => {
  const [isLoading, setIsLoading] = useState(false);
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<FieldValues>({
    defaultValues: {
      name: "",
      email: "",
      password: "",
    },
  });

  const router = useRouter();

  useEffect(() => {
    if(currentUser){
      router.push("/cart");
      router.refresh();
    }

  }, [])

  const onSubmit: SubmitHandler<FieldValues> = (data) => {
    setIsLoading(true);
    signIn('credentials', {
      ...data,
      redirect: false
    }).then((callback) =>{
      setIsLoading(false)

      if(callback?.ok){
        router.push('/cart');
        router.refresh();
        toast.success('Logged In');
      }
      if(callback?.error){
        toast.error(callback.error);
      }
    })
  };

  if(currentUser){
    return <p className="text-center">Logged in. Redirecting...</p>
  }

  return (
    <>
      <Heading title="Sign in to E-Commerce" />
      <Button outline label="Continue with Google" 
      icon={AiOutlineGoogle}
      onClick={()=>{signIn('google')}}
      />
      <hr className="bg-slate-300 w-full h-px" />
      
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

      <Button
        label={isLoading ? "Is loading" : "Login"}
        onClick={handleSubmit(onSubmit)}
      />

      <p className="text-sm">
        Dont have an account? {""}
        <Link className="underline" href={"/register"}>
          Sign Up
        </Link>
      </p>
    </>
  );
};

export default LoginForm;
