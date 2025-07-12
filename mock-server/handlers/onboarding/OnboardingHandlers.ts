import {createHandler} from "../utlity/createHandler.js";
import {addToClubStubs} from "../../stubs/onboarding/addToClubStubs.js";
import {createClubsStubs} from "../../stubs/onboarding/createClubStubs.js";
import {createUserStubs} from "../../stubs/onboarding/createUserStubs.js";
import {signUserStubs} from "../../stubs/onboarding/signUserStubs.js";
import {inviteClubStubs} from "../../stubs/onboarding/inviteClubStubs.js";


export const addClubHandler = () => createHandler(addToClubStubs);
export const createClubHandler = () => createHandler(createClubsStubs);
export const createUserHandler = () => createHandler(createUserStubs);
export const inviteClubHandler = () => createHandler(inviteClubStubs);
export const signUserHandler = () => createHandler(signUserStubs);
