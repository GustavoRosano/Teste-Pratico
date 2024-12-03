"use client";

import React, { useState } from "react";
import Login from "./Login"; 
import Register from "./Register"; 

const LoginRegister = ({ setIsLoggedIn }) => {
    const [isLogin, setIsLogin] = useState(false); 
    const [isRegister, setIsRegister] = useState(false); 
    const [isLoginRegister, setIsLoginRegister] = useState(true); 

    const toggleLogin = () => {
        setIsLogin(true);
        setIsRegister(false);
        setIsLoginRegister(false);
    };

    const toggleRegister = () => {
        setIsLogin(false);
        setIsRegister(true);
        setIsLoginRegister(false);
    };

    const toggleLoginRegister = () => {
        setIsLogin(false);
        setIsRegister(false);
        setIsLoginRegister(true);
    };

    return (
        <div className="flex flex-col bg-white text-black py-12 px-10 rounded-[30px] justify-center items-center text-center w-[800px]">
            {isLoginRegister ? (
                <div className="flex flex-col">
                    <h1 className="font-bold text-2xl mb-7">Entre ou Cadastre-se</h1>
                    <button onClick={toggleLogin} className="bg-[#23aec0] text-white font-bold rounded py-1 mb-4">
                        Entre
                    </button>
                    <button onClick={toggleRegister} className="bg-[#1e9a9e] text-white font-bold rounded py-1">
                        Cadastre-se
                    </button>
                </div>
            ) : (
                <div>
                    {isLogin && (
                        <Login toggleRegister={toggleRegister} toggleLoginRegister={toggleLoginRegister} setIsLoggedIn={setIsLoggedIn} />
                    )}
                    {isRegister && (
                        <Register toggleLogin={toggleLogin} toggleLoginRegister={toggleLoginRegister} setIsLoggedIn={setIsLoggedIn} />
                    )}
                </div>
            )}
        </div>
    );
};

export default LoginRegister;
