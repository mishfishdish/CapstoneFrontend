/**
 * Middleware to extract a stub token from the request headers
 * and determine if it is a known (allowed) token.
 *
 * Adds `req.stubContext = { token, isFallback }`
 */
export function resolveStubToken() {
    return (req: any, res: any, next: any) => {
        const token = req.headers['x-stub-token'] as string || 'default'
        const queryParams = req.query; // This will be an object like { foo: "bar", page: "2" }
        req.stubContext = {
            token,
            queryParams
        }

        next()
    }
}