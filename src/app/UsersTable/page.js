"use client";

import React, { useEffect, useState } from "react";

const UsersTable = ({ setIsLoggedIn }) => {
    const [usuarios, setUsuarios] = useState([]);
    const [loading, setLoading] = useState(true);

    const handleLogout = () => {
        setIsLoggedIn(false);
    };

    useEffect(() => {
        fetch("http://localhost:5000/usuarios")
            .then((response) => {
                if (!response.ok) {
                    throw new Error(`Erro na requisição: ${response.status}`);
                }
                return response.json();
            })
            .then((data) => {
                console.log(data); 

                if (Array.isArray(data)) {
                    setUsuarios(data); 
                } else if (data && Array.isArray(data.usuarios)) {
                    setUsuarios(data.usuarios); 
                } else {
                    console.error("Os dados dos usuários não estão no formato esperado:", data);
                    setUsuarios([]); 
                }

                setLoading(false);
            })
            .catch((error) => {
                console.error("Erro ao buscar os dados:", error);
                setLoading(false); 
            });
    }, []);

    return (
        <div>
            <button onClick={handleLogout} className="bg-red-500 text-white font-bold rounded px-3 py-1 mb-8">
                Logout
            </button>
            <h1 className="uppercase text-xl font-bold mb-3">Faturamento Anual de Cada Usuário</h1>
            <div className="flex flex-col w-full max-w-[1440px] max-h-[500px] overflow-y-auto">
                {loading ? (
                    <p>Carregando...</p>
                ) : (
                    <>
                        <div className="flex flex-row">
                            <p className="text-base font-light mr-[300px]">Nome</p>
                            <p className="text-base font-light mr-[300px]">E-mail</p>
                            <p className="text-base font-light mr-[300px]">Faturamento Anual</p>
                            <button>Endereço</button>
                        </div>

                        {usuarios.length > 0 ? (
                            usuarios.map((usuario) => (
                                <div key={usuario.id} className="flex flex-row mt-5 pb-2 border-b-2 border-gray-300">
                                    <p className="text-base font-light w-[342px]">{usuario.nome}</p>
                                    <p className="text-base font-light w-[347px]">{usuario.email}</p>
                                    <p className="text-base font-light w-[435px]">{usuario.faturamentoAnual}</p>
                                    <a href={`/useraddress/${usuario.id}`} className="bg-[#07b9b9] text-black font-bold py-2 px-3 rounded">
                                        Endereço
                                    </a>
                                </div>
                            ))
                        ) : (
                            <p>Não há usuários disponíveis.</p>
                        )}
                    </>
                )}
            </div>
        </div>
    );
};

export default UsersTable;
