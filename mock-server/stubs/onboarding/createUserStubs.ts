export const createUserStubs: Record<string, () => any> = {
    create_user_400: () => ({
        status: 400,
        response: {}
    }),
    default: () => ({
        status: 200,
        response: {
            userId: "user"
        }
    }),
}