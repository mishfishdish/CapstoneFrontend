export const signUserStubs: Record<string, () => any> = {
    sign_user_400: () => ({
        status: 400,
        response: {}
    }),
    default: () => ({
        status: 200,
        response: {}
    }),
}