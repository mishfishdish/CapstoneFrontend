import {createHandler} from "../utlity/createHandler.ts";
import {createTasksStubs} from "../../stubs/activityManagement/createTasksStubs.ts";
import {createEventsStubs} from "../../stubs/activityManagement/createEventsStubs.ts";
import {deleteEventsStubs} from "../../stubs/activityManagement/deleteEventsStubs.ts";
import {updateEventsStubs} from "../../stubs/activityManagement/updateEventsStubs.ts";


export const createTasksHandler = createHandler(createTasksStubs);
export const createEventsHandler = createHandler(createEventsStubs);
export const deleteEventsHandler = createHandler(deleteEventsStubs);
export const updateEventsHandler = createHandler(updateEventsStubs);
