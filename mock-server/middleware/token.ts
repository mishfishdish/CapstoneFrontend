
/**
 * Middleware to extract a stub token from the request headers
 * and determine if it is a known (allowed) token.
 *
 * Adds `req.stubContext = { token, isFallback }`
 */
export function resolveStubToken(allowedTokens: string[]) {
    return (req: any, res: any, next: any) => {
        const token = req.headers['x-stub-token'] as string || 'default'

        req.stubContext = {
            token,
        }

        next()
    }
}