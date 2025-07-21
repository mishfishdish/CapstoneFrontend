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
                startTime: "2025-06-15T09:00:00",
                endTime: "2025-06-17T17:00:00",
                dependsOnEventId: 3,
                type: "task"
            },
            {
                activityId: 2,
                activityTitle: "task 2",
                startTime: "2025-07-05T10:00:00",
                endTime: "2025-07-07T12:00:00",
                dependsOnEventId: 5,
                type: "task"
            },
            {
                activityId: 3,
                activityTitle: "event 1",
                startTime: "2025-06-10T13:00:00",
                endTime: "2025-06-10T15:00:00",
                type: "event"
            },
            {
                activityId: 4,
                activityTitle: "task 3",
                startTime: "2025-07-12T10:00:00",
                endTime: "2025-07-14T11:30:00",
                dependsOnEventId: 6,
                type: "task"
            },
            {
                activityId: 5,
                activityTitle: "event 2",
                startTime: "2025-07-01T10:00:00",
                endTime: "2025-07-01T13:00:00",
                type: "event"
            },
            {
                activityId: 6,
                activityTitle: "event 3",
                startTime: "2025-07-10T16:00:00",
                endTime: "2025-07-10T18:00:00",
                type: "event"
            },
            {
                activityId: 7,
                activityTitle: "task 4",
                startTime: "2025-08-01T09:00:00",
                endTime: "2025-08-03T17:00:00",
                dependsOnEventId: 9,
                type: "task"
            },
            {
                activityId: 8,
                activityTitle: "event 4",
                startTime: "2025-08-05T09:00:00",
                endTime: "2025-08-05T11:00:00",
                type: "event"
            },
            {
                activityId: 9,
                activityTitle: "event 5",
                startTime: "2025-07-25T14:00:00",
                endTime: "2025-07-25T16:00:00",
                type: "event"
            },
            {
                activityId: 10,
                activityTitle: "task 5",
                startTime: "2025-09-10T08:00:00",
                endTime: "2025-09-12T10:00:00",
                dependsOnEventId: 8,
                type: "task"
            },
            {
                activityId: 11,
                activityTitle: "event 6",
                startTime: "2025-09-20T12:00:00",
                endTime: "2025-09-20T13:30:00",
                type: "event"
            },
            {
                activityId: 12,
                activityTitle: "task 6",
                startTime: "2025-10-01T10:00:00",
                endTime: "2025-10-03T15:00:00",
                dependsOnEventId: 11,
                type: "task"
            }
        ]
    }),
}


