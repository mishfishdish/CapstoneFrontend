import {createHandler} from "../utlity/createHandler.ts";
import {listClubStubs} from "../../stubs/general/listClubStubs.ts";
import {listEventStubs} from "../../stubs/general/listEventsStubs.ts";
import {listActivitiesStubs} from "../../stubs/general/listActivitiesStubs.ts";
import {listEventDetailsStubs} from "../../stubs/general/listEventDetailsStubs.ts";
import {listTaskDetailsStubs} from "../../stubs/general/listTaskDetailsStubs.ts";


export const listClubsHandler = createHandler(listClubStubs);
export const listEventsHandler = createHandler(listEventStubs);
export const listActivitiesHandler = createHandler(listActivitiesStubs);
export const listEventDetailsHandler = createHandler(listEventDetailsStubs);
export const listTaskDetailsHandler = createHandler(listTaskDetailsStubs);