import {createHandler} from "../utlity/createHandler.ts";
import {addToClubStubs} from "../../stubs/onboarding/addToClubStubs.ts";
import {createClubsStubs} from "../../stubs/onboarding/createClubStubs.ts";
import {createUserStubs} from "../../stubs/onboarding/createUserStubs.ts";
import {signUserStubs} from "../../stubs/onboarding/signUserStubs.ts";
import {inviteClubStubs} from "../../stubs/onboarding/inviteClubStubs.ts";


export const addClubHandler = createHandler(addToClubStubs);
export const createClubHandler = createHandler(createClubsStubs);
export const createUserHandler = createHandler(createUserStubs);
export const inviteClubHandler = createHandler(inviteClubStubs);
export const signUserHandler = createHandler(signUserStubs);
