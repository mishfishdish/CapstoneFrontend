export function createHandler(stubMap) {
    return function handler(req, res) {
        const {token, queryParams} = req.stubContext; // guaranteed by middleware
        const stubEntry = (stubMap as any)[token] || (stubMap as any).default;
        const {status, response} = stubEntry(queryParams); // call the stub function
        res.status(status).json(response);
    };
}