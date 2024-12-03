# Teste Prático - Sistema de Login e Cadastro

Bem-vindo ao repositório do sistema de login e cadastro desenvolvido com **Next.js** e **TailwindCSS**, utilizando **Zod** e **React Hook Form** para validação de formulários. O projeto também conta com uma API simulada utilizando **JSON Server**.

Este guia ajudará você a configurar e executar o projeto, tanto para o frontend quanto para o backend.

---

## 🛠 Pré-requisitos

Certifique-se de ter as seguintes ferramentas instaladas em seu ambiente de desenvolvimento:

- **Node.js** (versão 16 ou superior)
- **npm**, **yarn**, ou **pnpm** (para gerenciar pacotes)
- **Git** (opcional, mas recomendado)

---

## 🚀 Instruções para Configuração e Execução

### 1. Clone o Repositório

Clone este repositório em sua máquina local:

```bash
git clone <URL_DO_REPOSITORIO>
cd <NOME_DA_PASTA>
```

### 2. Instale as Dependências

No diretório raiz do projeto, instale as dependências:

```bash
npm install
# ou
yarn install
# ou
pnpm install
```

### 3. Configuração do Backend (JSON Server)

O projeto utiliza o **JSON** Server para simular a API. Siga os passos abaixo para configurar e executar o backend:

#### 1. Certifique-se de estar no diretório raiz do projeto.
#### 2. Execute o comando abaixo para iniciar o JSON Server:

```bash
npx json-server --watch usuarios.json --port 5000
```
> O servidor estará disponível em http://localhost:5000.

### 4. Execute o Frontend (Next.js)

Para iniciar o servidor de desenvolvimento do frontend, use o seguinte comando:

```bash
npm run dev
# ou
yarn dev
# ou
pnpm dev
```
> O frontend estará disponível em http://localhost:3000.

### 5. Executando Ambos Simultaneamente

Você pode executar o backend e o frontend em terminais separados. Certifique-se de manter ambos ativos:

#### 1. Abra dois terminais.
#### 2. No primeiro terminal, execute o JSON Server:

```bash
npx json-server --watch db.json --port 5000
```

### 3. No segundo terminal, execute o Next.js:

```bash
npm run dev
```

---

## 🧪 Testando a Aplicação

### 1. Login
- **E-mail**: `teste.pratico@gmail.com`
- **Senha**: `123456`

### 2. Cadastro
- Preencha os campos com informações válidas para criar novos usuários.

---

## 📚 Tecnologias Utilizadas

- **Frontend**: Next.js, React, TailwindCSS
- **Validação**: Zod, React Hook Form
- **Estado Global**: Zustand
- **Backend Simulado**: JSON Server
- **HTTP Client**: Axios

---

## 🛑 Problemas Comuns

### Problema 1: "Porta já em uso"
- Certifique-se de que nenhuma outra aplicação está usando as portas `3000` ou `5000`.
- **Solução**: Encerrar o processo conflitante ou alterar as portas usadas.

### Problema 2: "Não consigo acessar o backend"
- Verifique se o **JSON Server** está rodando no terminal correto.

---

## 📄 Licença

Este projeto é apenas para fins educacionais e não possui uma licença específica.

---
