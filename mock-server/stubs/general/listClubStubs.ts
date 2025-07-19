export const listClubStubs: Record<string, () => any> = {
    list_club_400: () => ({
        status: 400,
        response: {}
    }),
    default: () => ({
        status: 200,
        response: [
            {
                "clubId": "1",
                "clubName": "Monash Tech Society"
            },
            {
                "clubId": "2",
                "clubName": "Women in STEM"
            }
        ]
    }),
}