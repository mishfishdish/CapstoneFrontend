import { Request, Response } from 'express'
import { userStubs } from '../stubs/userStubs'

export function userHandler(req: Request, res: Response) {
    const { token, isFallback } = req.stubContext! // guaranteed by middleware

    // If it's a fallback token, always use the default response
    const stubFn = isFallback
        ? userStubs.default
        : userStubs[token] || userStubs.default

    const status = isFallback ? 401 : 200

    return res.status(status).json(stubFn())
}