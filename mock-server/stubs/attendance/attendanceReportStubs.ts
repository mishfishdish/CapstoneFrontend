export const attendanceReportStubs: Record<string, () => any> = {
    default: () => ({
        status: 200,
        response: {attendees: [
                    { firstName: "Michelle", lastName: "Wong", memberType: "MANAGER" },
                    { firstName: "Jeevan", lastName: "Tharun", memberType: "MANAGER" },
                    { firstName: "Jai", lastName: "Masters", memberType: "MANAGER" },
                    { firstName: "Davin", lastName: "Pook", memberType: "MANAGER" },
                    { firstName: "Clara", lastName: "Nguyen", memberType: "MANAGER" },
                    { firstName: "Alex", lastName: "Tan", memberType: "MANAGER" },
                    { firstName: "Luna", lastName: "Park", memberType: "MANAGER" },
                    { firstName: "Ethan", lastName: "Kim", memberType: "MANAGER" },
                    { firstName: "Sophie", lastName: "Lee", memberType: "MANAGER" },
                    { firstName: "James", lastName: "Chen", memberType: "MANAGER" },
        ],}
    }),
}