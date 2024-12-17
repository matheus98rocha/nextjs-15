import { auth, signIn } from "@/auth/auth";
import React from "react";
import { redirect } from "next/navigation";
import Image from "next/image";

import { FcGoogle } from "react-icons/fc";
import { FaGithub } from "react-icons/fa";

const Login = async () => {
  return (
    <div className="h-screen w-screen flex items-center justify-center bg-gradient-to-b from-primary to-pink-600">
      <div className="flex flex-col items-center justify-center bg-white shadow-2xl rounded-lg p-8 gap-6 w-96 fade-in-bottom-150">
        {/* Logo */}
        <Image
          src="/logo.png"
          alt="logo"
          width={144}
          height={30}
          loading="lazy"
        />

        {/* Texto de boas-vindas */}
        <h1 className="text-2xl font-bold text-gray-800 text-center">
          Bem-vindo ao YCDirectory!
        </h1>
        <p className="text-gray-600 text-center">
          Faça login para continuar e aproveitar todos os recursos.
        </p>

        {/* Google Login */}
        <form
          className="w-full"
          action={async () => {
            "use server";
            await signIn("google");
          }}
        >
          <button
            type="submit"
            className="flex items-center justify-center gap-3 w-full p-4 border border-gray-300 rounded-md shadow hover:bg-gray-100 transition"
          >
            <FcGoogle className="text-2xl" />
            <span className="font-medium">Login com Google</span>
          </button>
        </form>

        {/* GitHub Login */}
        <form
          className="w-full"
          action={async () => {
            "use server";
            await signIn("github");
          }}
        >
          <button
            type="submit"
            className="flex items-center justify-center gap-3 w-full p-4 bg-gray-900 text-white rounded-md shadow hover:bg-gray-700 transition"
          >
            <FaGithub className="text-2xl" />
            <span className="font-medium">Login com GitHub</span>
          </button>
        </form>
      </div>
    </div>
  );
};

export default Login;
