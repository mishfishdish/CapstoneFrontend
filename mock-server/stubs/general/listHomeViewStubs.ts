export const listHomeViewStubs: Record<string, () => any> = {
    list_task_400: () => ({
        status: 400,
        response: {}
    }),
    default: () => ({
        status: 200,
        response:
            {
                name: "Michelle",
                activities: [
                    {
                        title: "Sponsorship meeting",
                        type: "event",
                        time: "2025-09-20T12:00:00",
                    },
                    {
                        title: "meeting",
                        type: "task",
                        time: "2025-09-20T12:00:00",
                    },
                    {
                        title: "meeting",
                        type: "event",
                        time: "2025-09-10T12:00:00",
                    },
                    {
                        title: "meeting",
                        type: "event",
                        time: "2025-09-05T12:00:00",
                    },
                    {
                        title: "meeting",
                        type: "event",
                        time: "2025-03-05T12:00:00",
                    }
                ],
                events: {
                    past: 10,
                    total: 20
                },
                tasks: {
                    completed: 10,
                    total: 20
                },
                logs: [
                    "Sponsorship meeting was created",
                    "MAC and MAPS meeting was updated",
                    "Portfolio meetup was created",
                    "Technical meeting was updated",
                    "Technical meeting was created"
                ]
            }
    }),
}