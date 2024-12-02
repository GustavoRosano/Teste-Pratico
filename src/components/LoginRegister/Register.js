"use client";

import React, { useState } from "react";
import { z } from "zod";

const registerSchema = z.object({
    name: z.string().min(3, "O nome deve ter pelo menos 3 caracteres"),
    email: z.string().email("E-mail inválido"),
    password: z.string().min(6, "A senha deve ter pelo menos 6 caracteres"),
    confirmPassword: z.string(),
    annualRevenue: z.string().regex(/^\d+$/, "Faturamento deve ser um número"),
}).refine((data) => data.password === data.confirmPassword, {
    message: "As senhas não coincidem",
    path: ["confirmPassword"], 
});

const Register = ({ toggleLogin, toggleLoginRegister, setIsLoggedIn }) => {
    const [formData, setFormData] = useState({
        name: "",
        email: "",
        password: "",
        confirmPassword: "",
        annualRevenue: "",
    });
    const [errors, setErrors] = useState({});
    const [feedbackMessage, setFeedbackMessage] = useState("");

    const handleSubmit = (e) => {
        e.preventDefault();
        try {
            registerSchema.parse(formData);
            console.log("Registro realizado com sucesso:", formData);
            setErrors({});
            setFeedbackMessage("Cadastro realizado com sucesso!");
            setIsLoggedIn(true)
        } catch (error) {
            if (error.errors) {
                const fieldErrors = {};
                error.errors.forEach((err) => {
                    fieldErrors[err.path[0]] = err.message;
                });
                setErrors(fieldErrors);
                setFeedbackMessage(""); 
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
            <h1 className="font-bold text-2xl mb-7">Cadastre-se</h1>
            <div className="flex flex-row gap-[15px]">
                <div className="flex flex-col">
                    <input
                        name="name"
                        type="text"
                        placeholder="Nome"
                        value={formData.name}
                        onChange={handleChange}
                        className="mb-3 w-[300px] p-3 border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-blue-500"
                    />
                    {errors.name && <p className="text-red-500 text-sm mb-2">{errors.name}</p>}
                </div>
                <div className="flex flex-col">
                    <input
                        name="email"
                        type="email"
                        placeholder="E-mail"
                        value={formData.email}
                        onChange={handleChange}
                        className="mb-3 w-[300px] p-3 border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-blue-500"
                    />
                    {errors.email && <p className="text-red-500 text-sm mb-2">{errors.email}</p>}
                </div>
            </div>
            <div className="flex flex-row gap-[15px]">
                <div className="flex flex-col">
                    <input
                        name="password"
                        type="password"
                        placeholder="Senha"
                        value={formData.password}
                        onChange={handleChange}
                        className="mb-3 w-[300px] p-3 border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-blue-500"
                    />
                    {errors.password && <p className="text-red-500 text-sm mb-2">{errors.password}</p>}
                </div>
                <div className="flex flex-col">
                    <input
                        name="confirmPassword"
                        type="password"
                        placeholder="Confirme sua senha"
                        value={formData.confirmPassword}
                        onChange={handleChange}
                        className="mb-3 w-[300px] p-3 border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-blue-500"
                    />
                    {errors.confirmPassword && <p className="text-red-500 text-sm mb-2">{errors.confirmPassword}</p>}
                </div>
            </div>
            <div className="flex flex-col">
                <input
                    name="annualRevenue"
                    type="number"
                    placeholder="Informe seu faturamento anual"
                    value={formData.annualRevenue}
                    onChange={handleChange}
                    className="mb-1 w-[615px] p-3 border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-blue-500"
                />
                {errors.annualRevenue && <p className="text-red-500 text-sm mb-2">{errors.annualRevenue}</p>}
            </div>
            <button type="submit" className="bg-[#1e9a9e] text-white font-bold rounded py-1 mt-3 mb-3">Cadastrar</button>
            <p className="text-sm text-[#2b2b2b]">Já possui um cadastro?</p>
            <button onClick={toggleLogin} className="text-[#1e9a9e] mt-2">Entre</button>

            {feedbackMessage && (
                <div className="mt-4 p-4 text-white bg-green-500 rounded">
                    {feedbackMessage}
                </div>
            )}
        </form>
    );
};

export default Register;
