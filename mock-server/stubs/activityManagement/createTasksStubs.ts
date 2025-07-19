export const createTasksStubs: Record<string, () => any> = {
    create_tasks_400: () => ({
        status: 400,
        response: {}
    }),
    default: () => ({
        status: 200,
        response: {}
    }),
}