"use client";
import "@/styles/pages/signup.scss";
import { useEffect, useState } from "react";
import registerSubmit from "@/utils/forSubmit";
import { useSignInMutation } from "@/services/authApi";
import { useRouter } from 'next/navigation'
import AuthStructure from "@/HOC/AuthStructure";
import { setCookie } from "cookies-next";
import { useDispatch } from "react-redux";
import { chatApi } from "@/services/chatApi";

const SignIn = () => {
  const [formData, setFormData] = useState([
    {
      id: "email",
      type: "email",
      label: "Email",
      value: "",
      image: "email",
      error: false,
      errMessage: "Please enter proper email address",
    },
    {
      id: "password",
      type: "password",
      label: "Passsword",
      value: "",
      image: "eye",
      error: false,
      errMessage: "Password must contain 8-15 character",
    },
  ]);

  const routes=useRouter();
  const dispatch=useDispatch();

  const [signin, {data, isSuccess,isLoading,error,isError }] = useSignInMutation();

  function formSubmitFunc(e) {
    const errorValu = registerSubmit(e, formData, setFormData).every(
      ({ error }) => !error
    );
    if (errorValu) {
      signin({
        email: formData[0].value,
        password: formData[1].value,
      });
    }
  }

  useEffect(() => {
    if (data){
      document.cookie = `token= ${data.token}; expires= ${new Date( Date.now() + 7 * 24 * 60 * 60 * 1000 ) }; path=/;`;
      if(data?.message===`Login successfully and OTP send ${formData[0].value}`){
        localStorage.setItem("postman",JSON.stringify({email:formData[0].value,OTP:data.user.OTPExpries}));
        setTimeout(()=>routes.push('/otp'),1000);
      }
      else{
        dispatch(chatApi.util.invalidateTags(['User']))
        setTimeout(()=>{
          routes.push('/chat')
        },1000);
      }
    }
  },[isSuccess]);


  const option={
    isSignIn:true,
    formData,
    setFormData,
    formSubmitFunc,
    data, 
    isSuccess,
    error,
    isError,
    message:data?.message||"Login Successfully",
    topic:"Already have a Account",
    subtopic:"Create new account.",
    navigateTo:"/signup",
    navDiscribe:"Sign up"
  }

  return (
    <AuthStructure {...option}/>
  );
};

export default SignIn;
