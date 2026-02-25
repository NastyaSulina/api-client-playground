import { Router, type Request, type Response } from 'express'
import { CLIENTS_DB } from './clients.service'
import { toClientDto } from './clients.mapper'

export const clientsRouter = Router()

clientsRouter.get('/', (req: Request, res: Response) => {
    const pageRaw = req.query.page ?? '1'
    const limitRaw = req.query.limit ?? '10'

    const page = Math.max(1, Number(pageRaw) || 1)
    const limit = Math.max(1, Math.min(100, Number(limitRaw) || 10))

    const total = CLIENTS_DB.length
    const totalPages = Math.max(1, Math.ceil(total / limit))

    const safePage = Math.min(page, totalPages)
    const start = (safePage - 1) * limit
    const end = start + limit

    const clients = CLIENTS_DB.slice(start, end).map(toClientDto)

    res.status(200).json({ clients, page: safePage, limit, total, totalPages })
})
