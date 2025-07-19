import {createHandler} from "../utlity/createHandler.ts";
import {listClubStubs} from "../../stubs/general/listClubStubs.ts";
import {listEventStubs} from "../../stubs/general/listEventsStubs.ts";


export const listClubsHandler = createHandler(listClubStubs);
export const listEventsHandler = createHandler(listEventStubs);
