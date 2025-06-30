import { Request, Response, NextFunction } from 'express'

/**
 * Middleware to extract a stub token from the request headers
 * and determine if it is a known (allowed) token.
 *
 * Adds `req.stubContext = { token, isFallback }`
 */
export function resolveStubToken(allowedTokens: string[]) {
    return (req: Request, res: Response, next: NextFunction) => {
        const token = req.headers['x-stub-token'] as string || 'default'
        const isFallback = !allowedTokens.includes(token)

        req.stubContext = {
            token,
            isFallback
        }

        next()
    }
}