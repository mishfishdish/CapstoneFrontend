declare namespace Express {
    export interface Request {
        stubContext?: {
            token: string;
            isFallback: boolean;
        }
    }
}