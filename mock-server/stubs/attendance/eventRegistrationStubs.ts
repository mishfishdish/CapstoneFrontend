export const eventRegistrationStubs: Record<string, () => any> = {
    create_event_400: () => ({
        status: 400,
        response: {}
    }),
    default: () => ({
        status: 200,
        response: {}
    }),
}