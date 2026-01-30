import Fastify from 'fastify'
import { RegisterRoutes } from './app/routes' 
import cors from '@fastify/cors'

const PORT = Number(process.env.PORT) || 5555

const app = Fastify({
  logger: true
})

app.register(cors, {
  origin: ['http://localhost:5173', 'http://192.168.2.106:5173'],
  methods: ['GET', 'POST', 'PUT', 'DELETE', 'OPTIONS', 'PATCH'], // <-- importante
})

app.register(RegisterRoutes)

app.listen({ host: '0.0.0.0', port: 5555 }).then(() => {
  console.log(`🚀 API rodando em http://localhost:${PORT}`)
})


