import React from "react";
import LoginBg from "@/public/images/login.svg";
import Image from "next/image";
import LoginCard from "@/components/login/login-card";
const Login = () => {
  return (
    <div className="fixed flex justify-center items-center top-0 left-0 w-full min-h-screen z-[100] bg-white">
      <Image
        src={LoginBg}
        alt="login"
        width={2000}
        height={1000}
        className="w-full object-cover h-screen absolute left-0 top-0"
      />
      <LoginCard />
    </div>
  );
};

export default Login;
