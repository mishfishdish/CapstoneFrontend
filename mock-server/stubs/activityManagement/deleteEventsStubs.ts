export const deleteEventsStubs: Record<string, () => any> = {
    delete_event_400: () => ({
        status: 400,
        response: {}
    }),
    default: () => ({
        status: 200,
        response: {}
    }),
}