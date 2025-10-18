import {createHandler} from "../utlity/createHandler.ts";
import {eventRegistrationStubs} from "../../stubs/attendance/eventRegistrationStubs.ts";
import {attendanceReportStubs} from "../../stubs/attendance/attendanceReportStubs.ts";

export const eventRegistrationHandler = createHandler(eventRegistrationStubs);
export const attendanceReportHandler = createHandler(attendanceReportStubs);

