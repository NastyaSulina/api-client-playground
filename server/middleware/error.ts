import type { ErrorRequestHandler } from 'express'

export const errorHandler: ErrorRequestHandler = (err, _req, res, _next) => {
    const error = err as Partial<Error & { status: number; statusCode: number }>

    const status = error.status ?? error.statusCode ?? 500

    const message =
        process.env.NODE_ENV === 'production'
            ? 'Internal Server Error'
            : (error.message ?? 'Unknown error')

    res.status(status).json({ error: message })
}
