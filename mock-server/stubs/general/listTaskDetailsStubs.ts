export const listTaskDetailsStubs: Record<string, () => any> = {
    list_task_400: () => ({
        status: 400,
        response: {}
    }),
    default: () => ({
        status: 200,
        response:
            {
                "title": "Prepare Semester Budget Report",
                "dueDate": "2025-08-15T18:00:00",
                "description": "Compile all financial transactions and prepare a report for the upcoming general meeting.",
                "clubs": ["2"],
                "priority": "Medium",
                "parentEventId": "1",
                "notifyBeforeMinutes": 45
            }
    }),
}