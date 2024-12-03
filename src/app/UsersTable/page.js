"use client";

import React from "react";
import { useRouter } from "next/navigation";
import axios from "axios";

const UsersTable = () => {
  const [usuarios, setUsuarios] = React.useState([]);
  const [loading, setLoading] = React.useState(true);
  const router = useRouter();

  React.useEffect(() => {
    const loggedInStatus = localStorage.getItem("isLoggedIn") === "true";
    if (!loggedInStatus) {
      router.push("/login");
    }

    axios.get("http://localhost:5000/usuarios")
      .then((response) => {
        setUsuarios(response.data);
        setLoading(false);
      })
      .catch((error) => {
        console.error("Erro ao buscar os dados:", error);
        setLoading(false);
      });
  }, [router]);

  return (
    <div className="w-full max-w-[1440px] px-10">
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
