export const inviteClubStubs: Record<string, () => any> = {
    invite_club_400: () => ({
        status: 400,
        response: {}
    }),
    default: () => ({
        status: 200,
        response: {}
    }),
}