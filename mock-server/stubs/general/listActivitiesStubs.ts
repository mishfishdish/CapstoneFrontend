export const listActivitiesStubs: Record<string, any> = {
    list_activities_400: () => ({
        status: 400,
        response: {}
    }),
    default: (params) => {
        if (params.page == null) {
            return {
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
            }
        }
        if (params.page == 0) {
            return {
                status: 200,
                response: {
                    "content": [
                        {
                            "activityId": "1a2b3c4d-1234-5678-90ab-1234567890ab",
                            "activityTitle": "Sponsorship Meeting",
                            "startTime": "2025-09-20T12:00:00",
                            "endTime": "2025-09-20T13:00:00",
                            "dependsOnEventId": null,
                            "type": "event"
                        },
                        {
                            "activityId": "2b3c4d5e-2345-6789-01bc-2345678901bc",
                            "activityTitle": "Complete Sponsorship Draft",
                            "startTime": null,
                            "endTime": "2025-09-25T17:00:00",
                            "dependsOnEventId": "1a2b3c4d-1234-5678-90ab-1234567890ab",
                            "type": "task"
                        },
                        {
                            "activityId": "3c4d5e6f-3456-7890-12cd-3456789012cd",
                            "activityTitle": "Internal Club Meeting",
                            "startTime": "2025-09-28T18:30:00",
                            "endTime": "2025-09-28T20:00:00",
                            "dependsOnEventId": null,
                            "type": "event"
                        },
                        {
                            "activityId": "4d5e6f7g-4567-8901-23de-4567890123de",
                            "activityTitle": "Draft Agenda Preparation",
                            "startTime": null,
                            "endTime": "2025-09-30T17:00:00",
                            "dependsOnEventId": "3c4d5e6f-3456-7890-12cd-3456789012cd",
                            "type": "task"
                        },
                        {
                            "activityId": "5e6f7g8h-5678-9012-34ef-5678901234ef",
                            "activityTitle": "Monash Coding Event",
                            "startTime": "2025-10-05T09:00:00",
                            "endTime": "2025-10-05T15:00:00",
                            "dependsOnEventId": null,
                            "type": "event"
                        },
                        {
                            "activityId": "6f7g8h9i-6789-0123-45fg-6789012345fg",
                            "activityTitle": "Prepare Code Samples",
                            "startTime": null,
                            "endTime": "2025-10-06T18:00:00",
                            "dependsOnEventId": "5e6f7g8h-5678-9012-34ef-5678901234ef",
                            "type": "task"
                        },
                        {
                            "activityId": "7g8h9i0j-7890-1234-56gh-7890123456gh",
                            "activityTitle": "Fundraising Workshop",
                            "startTime": "2025-10-10T14:00:00",
                            "endTime": "2025-10-10T16:00:00",
                            "dependsOnEventId": null,
                            "type": "event"
                        },
                        {
                            "activityId": "8h9i0j1k-8901-2345-67hi-8901234567hi",
                            "activityTitle": "Create Workshop Materials",
                            "startTime": null,
                            "endTime": "2025-10-11T20:00:00",
                            "dependsOnEventId": "7g8h9i0j-7890-1234-56gh-7890123456gh",
                            "type": "task"
                        },
                        {
                            "activityId": "9i0j1k2l-9012-3456-78ij-9012345678ij",
                            "activityTitle": "Post-Event Review",
                            "startTime": "2025-10-15T10:00:00",
                            "endTime": "2025-10-15T11:30:00",
                            "dependsOnEventId": null,
                            "type": "event"
                        },
                        {
                            "activityId": "0j1k2l3m-0123-4567-89jk-0123456789jk",
                            "activityTitle": "Write Review Report",
                            "startTime": null,
                            "endTime": "2025-10-17T17:00:00",
                            "dependsOnEventId": "9i0j1k2l-9012-3456-78ij-9012345678ij",
                            "type": "task"
                        }
                    ],
                    "pageable": {
                        "pageNumber": 0,
                        "pageSize": 10,
                        "sort": {
                            "empty": false,
                            "unsorted": false,
                            "sorted": true
                        },
                        "offset": 0,
                        "paged": true,
                        "unpaged": false
                    },
                    "totalPages": 2,
                    "totalElements": 20,
                    "last": false,
                    "first": true,
                    "size": 10,
                    "number": 0,
                    "sort": {
                        "empty": false,
                        "unsorted": false,
                        "sorted": true
                    },
                    "numberOfElements": 10,
                    "empty": false
                }
            }

        }

        return {
            "status": 200,
            "response": {
                "content": [
                    {
                        "activityId": "3c4d5e6f-3456-7890-12cd-3456789012cd",
                        "activityTitle": "Post-Event Review",
                        "startTime": "2025-10-01T10:00:00",
                        "endTime": "2025-10-01T11:00:00",
                        "dependsOnEventId": null,
                        "type": "event"
                    },
                    {
                        "activityId": "4d5e6f7g-4567-8901-23de-4567890123de",
                        "activityTitle": "Prepare Review Document",
                        "startTime": null,
                        "endTime": "2025-10-03T17:00:00",
                        "dependsOnEventId": "3c4d5e6f-3456-7890-12cd-3456789012cd",
                        "type": "task"
                    }
                ],
                "pageable": {
                    "pageNumber": 1,
                    "pageSize": 10,
                    "sort": {
                        "empty": false,
                        "unsorted": false,
                        "sorted": true
                    },
                    "offset": 10,
                    "paged": true,
                    "unpaged": false
                },
                "totalPages": 2,
                "totalElements": 20,
                "last": true,
                "first": false,
                "size": 10,
                "number": 1,
                "sort": {
                    "empty": false,
                    "unsorted": false,
                    "sorted": true
                },
                "numberOfElements": 10,
                "empty": false
            }
        }

    }


}


