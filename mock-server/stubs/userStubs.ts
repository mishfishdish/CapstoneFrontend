export const userStubs: Record<string, () => Record<string, any>> = {
    admin: () => ({
        name: 'Admin User',
        role: 'admin',
        permissions: ['create', 'read', 'update', 'delete'],
    }),

    guest: () => ({
        name: 'Guest User',
        role: 'guest',
        permissions: ['read'],
    }),

    default: () => ({
        error: 'Unauthorized. Invalid or missing stub token.',
    }),
}