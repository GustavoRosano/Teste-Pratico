"use client";

import React from "react";
import { z } from "zod";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";

const loginSchema = z.object({
  email: z.string().email("E-mail inválido"),
  password: z.string().min(6, "A senha deve ter pelo menos 6 caracteres"),
});

const Login = ({ toggleRegister, toggleLoginRegister, setIsLoggedIn }) => {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm({
    resolver: zodResolver(loginSchema),
  });

  const [feedbackMessage, setFeedbackMessage] = React.useState("");

  const onSubmit = (data) => {
    if (data.email === "gurosano@gmail.com" && data.password === "123456") {
      console.log("Login realizado com sucesso");
      
      localStorage.setItem("isLoggedIn", "true");
      setIsLoggedIn(true);
      setFeedbackMessage(""); 
    } else {
      setFeedbackMessage("E-mail ou senha incorretos");
    }
  };

  return (
    <form onSubmit={handleSubmit(onSubmit)} className="flex flex-col">
      <button onClick={toggleLoginRegister} className="text-sm">Voltar</button>
      <h1 className="font-bold text-2xl mb-7">Entre</h1>

      <input
        {...register("email")}
        type="email"
        placeholder="E-mail"
        className="mb-3 w-[600px] p-3 border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-blue-500"
      />
      {errors.email && <p className="text-red-500 text-sm mb-2">{errors.email?.message}</p>}

      <input
        {...register("password")}
        type="password"
        placeholder="Senha"
        className="mb-1 w-[600px] p-3 border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-blue-500"
      />
      {errors.password && <p className="text-red-500 text-sm mb-2">{errors.password?.message}</p>}

      <button type="submit" className="bg-[#1e9a9e] text-white font-bold rounded py-1 mb-3 mt-3">
        Entrar
      </button>

      <p className="text-sm text-[#2b2b2b]">Ainda não possui um cadastro?</p>
      <button onClick={toggleRegister} className="text-[#1e9a9e] mt-2">Cadastre-se</button>

      {feedbackMessage && (
        <div className="mt-4 p-4 text-white bg-red-500 rounded">
          {feedbackMessage}
        </div>
      )}
    </form>
  );
};

export default Login;
