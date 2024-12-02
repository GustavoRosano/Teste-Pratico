"use client";

import React, { useState, useEffect } from "react";
import { useParams } from 'next/navigation'; 

const UserAdress = () => {
  const [enderecos, setEnderecos] = useState([]);
  const [loading, setLoading] = useState(true);
  const { id } = useParams();

  useEffect(() => {
    if (!id) return;

    fetch("http://localhost:5000/enderecos")
      .then((response) => response.json())
      .then((data) => {
        const enderecosFiltrados = data.filter((endereco) => endereco.usuarioId === parseInt(id));
        setEnderecos(enderecosFiltrados);
        setLoading(false);
      })
      .catch((error) => {
        console.error("Erro ao buscar endereços:", error);
        setLoading(false);
      });
  }, [id]); 

  return (
    <div className="flex flex-col justify-center items-center h-[40vw]">
      <h1 className="uppercase text-xl font-bold mb-3">Endereços</h1>
      <div className="flex flex-col w-full max-w-[1440px] max-h-[500px] overflow-y-auto">
        <div className="flex flex-row">
          <p className="text-base font-light w-[342px]">Rua</p>
          <p className="text-base font-light w-[347px]">Cidade</p>
          <p className="text-base font-light w-[435px]">Estado</p>
          <button className="text-base font-light">CEP</button>
        </div>

        {loading ? (
          <p>Carregando...</p>
        ) : (
          enderecos.length > 0 ? (
            enderecos.map((endereco) => (
              <div key={endereco.cep} className="flex flex-row mt-5 pb-2 border-b-2 border-gray-300">
                <p className="text-base font-light w-[342px]">{endereco.rua}</p>
                <p className="text-base font-light w-[347px]">{endereco.cidade}</p>
                <p className="text-base font-light w-[435px]">{endereco.estado}</p>
                <p className="text-base font-light">{endereco.cep}</p>
              </div>
            ))
          ) : (
            <p>Não há endereços disponíveis para este usuário.</p>
          )
        )}

        <div className="flex flex-row gap-[100px] justify-center mt-5">
          <button>Adicionar Endereço</button>
          <button>Editar Endereço</button>
          <button>Remover Endereço</button>
        </div>
      </div>
    </div>
  );
};

export default UserAdress;
