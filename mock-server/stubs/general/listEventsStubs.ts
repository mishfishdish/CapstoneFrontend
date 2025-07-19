export const listEventStubs: Record<string, () => any> = {
    list_club_400: () => ({
        status: 400,
        response: {}
    }),
    default: () => ({
        status: 200,
        response: [
            {
                "activityId": "1",
                "activityTitle": "Coding session"
            },
            {
                "activityId": "2",
                "activityTitle": "Rapture session"
            }
        ]
    }),
}