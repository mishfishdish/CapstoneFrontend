export const listClubStubs: Record<string, () => any> = {
    create_club_400: () => ({
        status: 400,
        response: {}
    }),
    default: () => ({
        status: 200,
        response: [
            {
                "clubId": "1",
                "name": "Monash Tech Society"
            },
            {
                "clubId": "2",
                "name": "Women in STEM"
            }
        ]
    }),
}