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
                "qrCode": "data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAASwAAAEsAQAAAABRBrPYAAACRElEQVR4Xu2XQa7bMAxE6ZWP4ZvK8k19hC61EjuPcopEKNBuiiKEiCCQqacPeDik8s3/Jn7YnPltLGyKhU2xsCkWNsXCpvgXWDfibIf7fbpfftvufb/J7rkw1nexo+oTwAnJkdjKhEWy2YYg4u0kzaJkxCTI1UyxPWRajHwkryb+6BzMhzmFhoTxpta2ODi2EmFGCJs+ZHNhv6JrS3nU+MinwRAkXr+ol6PoscDqVzKMC+jxc4/xxeziEZ+nwmwE1+713Eeso8dTYd4OdNDU4uGm6H7r2NmO2M6D9V1drB8YFF1R9IggxJkL88ajNOlR6AuetWTZcmFkmnTQUsrg+bMxwXD7ey98P+YNP3dmF1il+l4D6NkwtbOFFIejzLiMMHnJhfXRyyxvih4+1xHcHn8mD0aGq5a6hwEQhF4mkwmTDlt7Xr8PA7wauafDTNWPilcuIASRB0o4PxdGxVEDhsGloo9TV+zmwRpjatR6wOXVy/VdkO/HwtWKYewwPLLw/W7yBJjHZD7xNjpIEIvLqOzz4Pp2rPOjQhfuc+duwwD7bPIc2BX9W7mMuIId20uZo34KkgBTpr/mVR1TmiNsJcNCEBr5YeKU7ZzKhI3o/BgmX42mRg05PxfGu3MBIYWFFCWO6GPvpU+AsWZKFzwwdBAzLJEM04vfiEDRJYt7C41iXCfEcDg61LEb+tSP0mfBTDG6GMDb09S5MH2BbfG/z0b1bw6Fz1NhpHA4rx8V9zcyE/bHWNgUC5tiYVMsbIqFTfF/sJ9UnTAducX6hAAAAABJRU5ErkJggg=="
            }
    }),
}