import 'dotenv/config'
import express from 'express'
import helmet from 'helmet'
import { errorHandler } from './middleware/error'
import { clientsRouter } from './features/clients/clients.controller'

const port = Number(process.env.PORT) || 3001
const app = express()

app.use(helmet())
app.use(express.json())

app.get('/api/ping', (_req, res) => {
    res.json({ status: 'ok' })
})
app.use('/api/clients', clientsRouter)

app.listen(port, () => {
    console.log(`[server] http://localhost:${port}`)
})

app.use(errorHandler)
