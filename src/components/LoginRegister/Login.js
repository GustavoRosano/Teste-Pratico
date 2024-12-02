"use client";

import React, { useState } from "react";
import { z } from "zod";

const loginSchema = z.object({
  email: z.string().email("E-mail inválido"),
  password: z.string().min(6, "A senha deve ter pelo menos 6 caracteres"),
});

const Login = ({ toggleRegister, toggleLoginRegister, setIsLoggedIn }) => {
  const [formData, setFormData] = useState({ email: "", password: "" });
  const [errors, setErrors] = useState({});

  const handleSubmit = (e) => {
    e.preventDefault();
    try {
      loginSchema.parse(formData); 

      if (formData.email === "gurosano@gmail.com" && formData.password === "123456") {
        console.log("Login realizado com sucesso");
        setIsLoggedIn(true); 
        setErrors({});
      } else {
        setErrors({
          email: "E-mail ou senha incorretos",
        });
      }
    } catch (error) {
      if (error.errors) {
        const fieldErrors = {};
        error.errors.forEach((err) => {
          fieldErrors[err.path[0]] = err.message;
        });
        setErrors(fieldErrors);
      }
    }
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  return (
    <form onSubmit={handleSubmit} className="flex flex-col">
      <button onClick={toggleLoginRegister} className="text-sm">Voltar</button>
      <h1 className="font-bold text-2xl mb-7">Entre</h1>
      <input
        name="email"
        type="email"
        placeholder="E-mail"
        value={formData.email}
        onChange={handleChange}
        className="mb-3 w-[600px] p-3 border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-blue-500"
      />
      {errors.email && <p className="text-red-500 text-sm mb-2">{errors.email}</p>}
      <input
        name="password"
        type="password"
        placeholder="Senha"
        value={formData.password}
        onChange={handleChange}
        className="mb-1 w-[600px] p-3 border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-blue-500"
      />
      {errors.password && <p className="text-red-500 text-sm mb-2">{errors.password}</p>}
      <button type="submit" className="bg-[#1e9a9e] text-white font-bold rounded py-1 mb-3 mt-3">Entrar</button>
      <p className="text-sm text-[#2b2b2b]">Ainda não possui um cadastro?</p>
      <button onClick={toggleRegister} className="text-[#1e9a9e] mt-2">Cadastre-se</button>
    </form>
  );
};

export default Login;
