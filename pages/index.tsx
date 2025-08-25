"use client";

import React from "react";
import { AnimatePresence, motion } from "framer-motion";
import Image from "next/image";
import LoginBg from "@/public/images/login.svg";
import LoginCard from "@/components/login/login-card";
import RegisterCard from "@/components/login/register-card";

const cardVariants = {
  initial: { opacity: 0, y: 12, scale: 0.98 },
  animate: { opacity: 1, y: 0, scale: 1 },
  exit:    { opacity: 0, y: -12, scale: 0.98 },
};

export default function Login() {
  const [isLogin, setIsLogin] = React.useState(true);

  return (
    <div className="fixed inset-0 z-[100] flex items-center justify-center bg-white overflow-hidden">
      <Image
        src={LoginBg}
        alt="login"
        width={2000}
        height={1000}
        priority
        className="w-full h-screen object-cover absolute inset-0"
      />

      <AnimatePresence mode="wait">
        <motion.div
          key={isLogin ? "login" : "register"}
          variants={cardVariants}
          initial="initial"
          animate="animate"
          exit="exit"
          transition={{ type: "spring", stiffness: 260, damping: 24 }}
          className="relative z-[101] w-full max-w-[520px]"
        >
          {isLogin ? (
            <LoginCard setIsLogin={setIsLogin} />
          ) : (
            <RegisterCard setIsLogin={setIsLogin} />
          )}
        </motion.div>
      </AnimatePresence>
    </div>
  );
}
