export const addToClubStubs: Record<string, () => any> = {
    add_club_400: () => ({
        status: 400,
        response: {}
    }),
    default: () => ({
        status: 200,
        response: {}
    }),
}