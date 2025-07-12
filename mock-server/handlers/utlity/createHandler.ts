export function createHandler(stubMap) {
  return function handler(req, res) {
    const { token } = req.stubContext; // guaranteed by middleware
    const stubEntry = (stubMap as any)[token] || (stubMap as any).default;
    const responseFn = stubEntry.response;
    const status = stubEntry.status;

    res.status(status).json(responseFn());
  };
}