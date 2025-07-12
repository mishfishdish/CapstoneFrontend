export const createClubsStubs: Record<string, () => any> = {
    create_club_400: () => ({
        status: 400,
        response: {}
    }),
    default: () => ({
        status: 200,
        response: {}
    }),
}