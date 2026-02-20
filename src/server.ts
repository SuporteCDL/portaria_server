import Fastify, { FastifyReply, FastifyRequest } from 'fastify'
import jwt from "@fastify/jwt"
import { env } from './config/env.js'
import { RegisterRoutes } from './app/routes.js' 
import cors from '@fastify/cors'
import path from 'path'
import fastifyStatic from '@fastify/static'
import { fileURLToPath } from "url"

const PORT=5050

const app = Fastify({
  logger: true
})

// 🔹 Necessário para usar __dirname no ESModule
const __filename = fileURLToPath(import.meta.url)
const __dirname = path.dirname(__filename)

// 🔹 JWT
app.register(jwt, {
  secret: env.JWT_SECRET,
  sign: {
    expiresIn: "7d"
  }
})

// 🔹 CORS (em produção pode remover)
app.register(cors, {
  origin: true,
  methods: ["GET", "POST", "PUT", "PATCH", "DELETE", "OPTIONS"]
})

// 🔹 Rotas da API
app.register(RegisterRoutes, { prefix: "/api" })

// 🔥 Servir frontend (build do Vite)
app.register(fastifyStatic, {
  root: path.join(__dirname, "../../web/dist"), // ajuste se necessário
})

// 🔥 Fallback para SPA (React Router funcionar)
app.setNotFoundHandler((request:FastifyRequest, reply:FastifyReply) => {
  if (!request.url.startsWith("http://192.168.2.106:5050/api")) {
    return reply.sendFile("index.html")
  }
  reply.status(404).send({ error: "Not Found" })
})

app.post("/api/refresh", async (request:FastifyRequest, reply:FastifyReply) => {
  try {
    const { refreshToken } = request.body as { refreshToken: string }

    if (!refreshToken) {
      return reply.status(401).send({ error: "Refresh token não enviado" })
    }

    // 🔐 Verifica refresh token
    const payload = app.jwt.verify(refreshToken)

    // 🔥 Gera novo access token
    const newAccessToken = app.jwt.sign(
      {
        sub: (payload as any).sub,
        role: (payload as any).role
      },
      { expiresIn: "7d" }
    )

    return reply.send({ accessToken: newAccessToken })
  } catch (err) {
    return reply.status(401).send({ error: "Refresh token inválido" })
  }
})

app.listen({ host: "0.0.0.0", port: PORT }).then(() => {
  console.log(`🚀 Sistema rodando na porta ${PORT}`)
})

