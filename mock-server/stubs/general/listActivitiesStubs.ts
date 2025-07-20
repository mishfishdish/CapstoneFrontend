export const listActivitiesStubs: Record<string, () => any> = {
    list_activities_400: () => ({
        status: 400,
        response: {}
    }),
    default: () => ({
        status: 200,
        response: [
            {
                activityId: 1,
                activityTitle: "task 1",
                startTime: "2025-07-21T09:00:00",
                endTime: "2025-07-21T11:00:00",
                dependsOnEventId: 3,
                type: "task"
            },
            {
                activityId: 2,
                activityTitle: "task 2",
                startTime: "2025-07-24T14:00:00",
                endTime: "2025-07-24T15:00:00",
                dependsOnEventId: 5,
                type: "task"
            },
            {
                activityId: 3,
                activityTitle: "event 1",
                startTime: "2025-07-20T10:00:00",
                endTime: "2025-07-20T12:00:00",
                type: "event"
            },
            {
                activityId: 4,
                activityTitle: "task 3",
                startTime: "2025-07-29T13:00:00",
                endTime: "2025-07-29T14:30:00",
                dependsOnEventId: 6,
                type: "task"
            },
            {
                activityId: 5,
                activityTitle: "event 2",
                startTime: "2025-07-22T11:00:00",
                endTime: "2025-07-22T13:00:00",
                type: "event"
            },
            {
                activityId: 6,
                activityTitle: "event 3",
                startTime: "2025-07-28T16:00:00",
                endTime: "2025-07-28T18:00:00",
                type: "event"
            },
            {
                activityId: 7,
                activityTitle: "task 4",
                startTime: "2025-08-03T10:00:00",
                endTime: "2025-08-03T11:30:00",
                dependsOnEventId: 9,
                type: "task"
            },
            {
                activityId: 8,
                activityTitle: "event 4",
                startTime: "2025-08-05T09:30:00",
                endTime: "2025-08-05T11:00:00",
                type: "event"
            },
            {
                activityId: 9,
                activityTitle: "event 5",
                startTime: "2025-08-01T14:00:00",
                endTime: "2025-08-01T15:30:00",
                type: "event"
            },
            {
                activityId: 10,
                activityTitle: "task 5",
                startTime: "2025-08-15T08:00:00",
                endTime: "2025-08-15T10:00:00",
                dependsOnEventId: 8,
                type: "task"
            },
            {
                activityId: 11,
                activityTitle: "event 6",
                startTime: "2025-08-20T12:00:00",
                endTime: "2025-08-20T13:30:00",
                type: "event"
            },
            {
                activityId: 12,
                activityTitle: "task 6",
                startTime: "2025-08-25T14:00:00",
                endTime: "2025-08-25T15:30:00",
                dependsOnEventId: 11,
                type: "task"
            }
        ]
    }),
}


