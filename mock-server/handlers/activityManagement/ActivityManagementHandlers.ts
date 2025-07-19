import {createHandler} from "../utlity/createHandler.ts";
import {createTasksStubs} from "../../stubs/activityManagement/createTasksStubs.ts";
import {createEventsStubs} from "../../stubs/activityManagement/createEventsStubs.ts";


export const createTasksHandler = createHandler(createTasksStubs);
export const createEventsHandler = createHandler(createEventsStubs)