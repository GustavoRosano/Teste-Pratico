"use client";

import React, { useState, useEffect } from "react";
import { useParams } from 'next/navigation'; 

const UserAddress = () => {
  const { id } = useParams(); 
  const [enderecos, setEnderecos] = useState([]);
  const [loading, setLoading] = useState(true);
  const [selectedAddress, setSelectedAddress] = useState(null); 
  const [newAddress, setNewAddress] = useState({ rua: '', cidade: '', estado: '', cep: '' }); 
  const [isAdding, setIsAdding] = useState(false); 
  const [isEditing, setIsEditing] = useState(false);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await fetch(`http://localhost:5000/enderecos`);
        const data = await response.json();
        const enderecosFiltrados = data.filter((endereco) => endereco.usuarioId === parseInt(id));
        setEnderecos(enderecosFiltrados);
        setLoading(false);
      } catch (error) {
        console.error("Erro ao buscar endereços:", error);
        setLoading(false);
      }
    };

    fetchData();
  }, [id]);

  const handleAddAddress = async () => {
    if (!newAddress.rua || !newAddress.cidade || !newAddress.estado || !newAddress.cep) {
      alert("Por favor, preencha todos os campos.");
      return;
    }

    try {
      const response = await fetch("http://localhost:5000/enderecos", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          ...newAddress,
          usuarioId: parseInt(id), 
        }),
      });

      const newData = await response.json();
      setEnderecos([...enderecos, newData]);
      setNewAddress({ rua: '', cidade: '', estado: '', cep: '' }); 
      setIsAdding(false); 
    } catch (error) {
      console.error("Erro ao adicionar endereço:", error);
    }
  };

  const handleEditAddress = async () => {
    if (!selectedAddress.rua || !selectedAddress.cidade || !selectedAddress.estado || !selectedAddress.cep) {
      alert("Por favor, preencha todos os campos.");
      return;
    }

    try {
      const response = await fetch(`http://localhost:5000/enderecos/${selectedAddress.cep}`, {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(selectedAddress),
      });

      const updatedData = await response.json();
      const updatedEnderecos = enderecos.map((endereco) =>
        endereco.cep === selectedAddress.cep ? updatedData : endereco
      );
      setEnderecos(updatedEnderecos); 
      setIsEditing(false); 
      setSelectedAddress(null); 
    } catch (error) {
      console.error("Erro ao editar endereço:", error);
    }
  };

  const handleRemoveAddress = async (cep) => {
    try {
      await fetch(`http://localhost:5000/enderecos/${cep}`, {
        method: "DELETE",
      });

      const updatedEnderecos = enderecos.filter((endereco) => endereco.cep !== cep);
      setEnderecos(updatedEnderecos); 
    } catch (error) {
      console.error("Erro ao remover endereço:", error);
    }
  };

  return (
    <div className="flex flex-col justify-center items-center h-[40vw]">
      <h1 className="uppercase text-xl font-bold mb-3">Endereços</h1>

      {isAdding && (
        <div className="mb-4 p-4 border border-gray-300 rounded">
          <h2 className="text-lg font-bold mb-2">Adicionar Endereço</h2>
          <input
            type="text"
            placeholder="Rua"
            value={newAddress.rua}
            onChange={(e) => setNewAddress({ ...newAddress, rua: e.target.value })}
            className="p-2 border mb-2"
          />
          <input
            type="text"
            placeholder="Cidade"
            value={newAddress.cidade}
            onChange={(e) => setNewAddress({ ...newAddress, cidade: e.target.value })}
            className="p-2 border mb-2"
          />
          <input
            type="text"
            placeholder="Estado"
            value={newAddress.estado}
            onChange={(e) => setNewAddress({ ...newAddress, estado: e.target.value })}
            className="p-2 border mb-2"
          />
          <input
            type="text"
            placeholder="CEP"
            value={newAddress.cep}
            onChange={(e) => setNewAddress({ ...newAddress, cep: e.target.value })}
            className="p-2 border mb-2"
          />
          <button onClick={handleAddAddress} className="bg-green-500 text-white p-2 rounded">Adicionar</button>
          <button onClick={() => setIsAdding(false)} className="bg-red-500 text-white p-2 rounded ml-2">Cancelar</button>
        </div>
      )}

      {isEditing && selectedAddress && (
        <div className="mb-4 p-4 border border-gray-300 rounded">
          <h2 className="text-lg font-bold mb-2">Editar Endereço</h2>
          <input
            type="text"
            placeholder="Rua"
            value={selectedAddress.rua}
            onChange={(e) => setSelectedAddress({ ...selectedAddress, rua: e.target.value })}
            className="p-2 border mb-2"
          />
          <input
            type="text"
            placeholder="Cidade"
            value={selectedAddress.cidade}
            onChange={(e) => setSelectedAddress({ ...selectedAddress, cidade: e.target.value })}
            className="p-2 border mb-2"
          />
          <input
            type="text"
            placeholder="Estado"
            value={selectedAddress.estado}
            onChange={(e) => setSelectedAddress({ ...selectedAddress, estado: e.target.value })}
            className="p-2 border mb-2"
          />
          <input
            type="text"
            placeholder="CEP"
            value={selectedAddress.cep}
            onChange={(e) => setSelectedAddress({ ...selectedAddress, cep: e.target.value })}
            className="p-2 border mb-2"
          />
          <button onClick={handleEditAddress} className="bg-blue-500 text-white p-2 rounded">Salvar</button>
          <button onClick={() => setIsEditing(false)} className="bg-red-500 text-white p-2 rounded ml-2">Cancelar</button>
        </div>
      )}

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
                <button onClick={() => { setSelectedAddress(endereco); setIsEditing(true); }} className="bg-yellow-500 text-white p-2 rounded ml-2">Editar</button>
                <button onClick={() => handleRemoveAddress(endereco.cep)} className="bg-red-500 text-white p-2 rounded ml-2">Remover</button>
              </div>
            ))
          ) : (
            <p>Não há endereços disponíveis para este usuário.</p>
          )
        )}

        <div className="flex flex-row gap-[100px] justify-center mt-5">
          {!isAdding && !isEditing && <button onClick={() => setIsAdding(true)} className="bg-green-500 text-white p-2 rounded">Adicionar Endereço</button>}
        </div>
      </div>
    </div>
  );
};

export default UserAddress;
