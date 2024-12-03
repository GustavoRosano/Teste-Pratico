"use client";

import React from "react";
import axios from "axios";
import { z } from "zod";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import useStore from "@/store/useStore";

const registerSchema = z.object({
    name: z.string().min(3, "O nome deve ter pelo menos 3 caracteres"),
    email: z.string().email("E-mail inválido"),
    password: z.string().min(6, "A senha deve ter pelo menos 6 caracteres"),
    confirmPassword: z.string(),
    annualRevenue: z.string().refine((value) => {
        const cleanedValue = value.replace(/[^\d.-]/g, "");
        return !isNaN(cleanedValue) && cleanedValue.length > 0;
    }, {
        message: "Faturamento deve ser um número válido",
    }),
}).refine((data) => data.password === data.confirmPassword, {
    message: "As senhas não coincidem",
    path: ["confirmPassword"],
});

const Register = ({ toggleLogin, toggleLoginRegister }) => {
    const {
        register,
        handleSubmit,
        formState: { errors },
        setValue,
        reset,
    } = useForm({
        resolver: zodResolver(registerSchema),
    });

    const setIsLoggedIn = useStore((state) => state.setIsLoggedIn);
    const [feedbackMessage, setFeedbackMessage] = React.useState("");

    const formatCurrency = (value) => {
        return value.replace(/\D/g, '').replace(/(\d)(\d{3})(\d)/, '$1$2,$3').replace(/(\d)(\d{2})$/, '$1.$2');
    };

    const handleAnnualRevenueChange = (e) => {
        let value = e.target.value;

        value = formatCurrency(value);

        setValue("annualRevenue", value);
    };

    const onSubmit = async (data) => {
        try {
            const cleanedRevenue = data.annualRevenue.replace(/[^\d.-]/g, "");

            await axios.post("http://localhost:5000/usuarios", {
                nome: data.name,
                email: data.email,
                faturamentoAnual: parseFloat(cleanedRevenue), 
            }, {
                headers: {
                    "Content-Type": "application/json",
                },
            });

            setFeedbackMessage("Cadastro realizado com sucesso!");
            setIsLoggedIn(true); 
            reset(); 
        } catch (error) {
            console.error("Erro ao realizar o cadastro", error);
            setFeedbackMessage("Erro ao realizar cadastro");
        }
    };

    return (
        <form onSubmit={handleSubmit(onSubmit)} className="flex flex-col">
            <button onClick={toggleLoginRegister} className="text-sm">Voltar</button>
            <h1 className="font-bold text-2xl mb-7">Cadastre-se</h1>

            <div className="flex flex-row gap-[15px]">
                <div className="flex flex-col">
                    <input
                        {...register("name")}
                        type="text"
                        placeholder="Nome"
                        className="mb-3 w-[300px] p-3 border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-blue-500"
                    />
                    {errors.name && <p className="text-red-500 text-sm mb-2">{errors.name?.message}</p>}
                </div>
                <div className="flex flex-col">
                    <input
                        {...register("email")}
                        type="email"
                        placeholder="E-mail"
                        className="mb-3 w-[300px] p-3 border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-blue-500"
                    />
                    {errors.email && <p className="text-red-500 text-sm mb-2">{errors.email?.message}</p>}
                </div>
            </div>

            <div className="flex flex-row gap-[15px]">
                <div className="flex flex-col">
                    <input
                        {...register("password")}
                        type="password"
                        placeholder="Senha"
                        className="mb-3 w-[300px] p-3 border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-blue-500"
                    />
                    {errors.password && <p className="text-red-500 text-sm mb-2">{errors.password?.message}</p>}
                </div>
                <div className="flex flex-col">
                    <input
                        {...register("confirmPassword")}
                        type="password"
                        placeholder="Confirme sua senha"
                        className="mb-3 w-[300px] p-3 border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-blue-500"
                    />
                    {errors.confirmPassword && <p className="text-red-500 text-sm mb-2">{errors.confirmPassword?.message}</p>}
                </div>
            </div>

            <div className="flex flex-col">
                <input
                    {...register("annualRevenue")}
                    type="text"
                    placeholder="Informe seu faturamento anual"
                    className="mb-1 w-[615px] p-3 border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-blue-500"
                    onChange={handleAnnualRevenueChange}
                />
                {errors.annualRevenue && <p className="text-red-500 text-sm mb-2">{errors.annualRevenue?.message}</p>}
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
