# Estrutura de Backend com Fastify + Typescript
Este documento descreve uma **estrutura recomendada de backend** utilizando **Fastify + TypeScript**, pensada para projetos escaláveis, organizados e fáceis de manter.

---

## 🎯 Objetivo da Estrutura

- Separar responsabilidades
- Facilitar crescimento do projeto
- Manter regras de negócio desacopladas
- Permitir testes e manutenção simples

---

## 📁 Estrutura de Pastas Recomendada

```txt
server/
 ├── src/
 │    ├── app/
 │    │    └── routes.ts
 │    ├── config/
 │    │    └── env.ts
 │    ├── database/
 │    │    └── knex.ts
 │    ├── middlewares/
 │    │    └── autenticate.ts
 │    ├── modules/
 │    │    ├── departments/
 │    │    ├── entries/
 │    │    └── users/
 │    ├── types/
 │    │    ├── fastify-jwt.d.ts
 │    │    └── fastify.d.ts
 │    ├── utils/
 │    │    ├── functions.ts
 │    │    └── interface.ts
 │    └── server.ts
 ├── .env
 ├── .env.example
 ├── .gitignore
 ├── tsconfig.json
 └── package.json
```

---

## 🧱 Conceito por Camada

### 🔹 Routes
Responsável apenas por:
- Definir endpoints
- Associar middlewares
- Encaminhar para o controller

> ❌ Nunca colocar regra de negócio aqui

---

### 🔹 Controllers
Responsável por:
- Receber request
- Extrair dados (params, body, query)
- Retornar response

> ❌ Não acessa banco diretamente

---

### 🔹 Services
Responsável por:
- Regras de negócio
- Validações de fluxo
- Decisões do sistema

> ✅ Onde fica a lógica principal

---

### 🔹 Repositories
Responsável por:
- Comunicação com banco de dados
- Queries
- Persistência

> Pode usar Prisma, Supabase ou SQL direto

---

### 🔹 Schemas
Responsável por:
- Validação de dados
- Contratos de entrada

> Normalmente usando Zod

---

## 🌐 Exemplo de Fluxo de Requisição

```txt
Request → Route → Middleware → Controller → Service → Repository → Banco
```

---

## ⚙️ Arquivos Principais

### app.ts

- Cria a instância do servidor (Fastify / Express)
- Registra middlewares globais
- Registra rotas

---

### server.ts

- Lê variáveis de ambiente
- Inicia o servidor HTTP

---

## 🔐 Middlewares

- Autenticação JWT
- Tratamento de erros
- Logs

---

## ❌ Tratamento de Erros

Criar uma classe base:

- AppError
- Erros padronizados
- Resposta consistente para o frontend

---

## 🧪 Testes (opcional)

Estrutura sugerida:

```txt
src/
 └── tests/
      ├── unit/
      └── integration/
```

---

## 🚀 Boas Práticas

- Um módulo por domínio
- Nada de regra de negócio no controller
- Usar TypeScript estrito
- Variáveis sensíveis apenas no `.env`

---

## 📌 Observação Final

Essa estrutura funciona muito bem para:
- APIs REST
- Backends para React / React Native
- Sistemas de PDV
- SaaS
- Automação

Ela pode ser expandida conforme o projeto cresce.
