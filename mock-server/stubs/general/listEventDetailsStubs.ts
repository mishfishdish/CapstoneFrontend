export const listEventDetailsStubs: Record<string, () => any> = {
    list_club_400: () => ({
        status: 400,
        response: {}
    }),
    default: () => ({
        status: 200,
        response:
            {
                "title": "Club Orientation Session",
                "startTime": "2025-07-25T10:00:00",
                "endTime": "2025-07-25T12:00:00",
                "location": "Monash Clayton Campus, Building 63, Room 101",
                "description": "A welcome event for new club members with introductions and activities.",
                "clubs": [
                    "1",
                    "2"
                ],
                "parentEventId": "1",
                "notifyBeforeMinutes": 30,
                "qrCode": "data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAMgAAADICAYAAACt..."
            }
    }),
}