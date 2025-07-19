import {Route, Routes} from 'react-router-dom';
import RegistrationSuccessPage from "./onboarding/RegistrationSuccessPage.tsx";
import {
    PAGE_ACTIVITY,
    PAGE_ADD_MEMBER,
    PAGE_CLUB_SETTINGS,
    PAGE_CREATE_CLUB,
    PAGE_CREATE_EVENT,
    PAGE_CREATE_TASK,
    PAGE_LOGIN,
    PAGE_REGISTRATION,
    PAGE_REGISTRATION_SUCCESS
} from "./PathConstants.tsx";
import LoginPage from "./onboarding/LoginInPage.tsx";
import AddMembersPage from "./onboarding/AddMembersToClubPage.tsx";
import SettingsPage from "./onboarding/ClubSettingPage.tsx";
import CreateClubPage from "./onboarding/CreateAClubPage.tsx";
import ManualRegistrationPage from "./onboarding/ManualRegistrationPage.tsx";
import CreateActivityLandingPage from "./activityManagement/createActivity.tsx";
import CreateTaskPage from "./activityManagement/createTask.tsx";
import CreateEventPage from "./activityManagement/createEvent.tsx";


export default function AppRoutes() {
    return (
        <Routes>
            <Route path={PAGE_LOGIN} element={<LoginPage/>}/>
            <Route path={PAGE_ADD_MEMBER} element={<AddMembersPage/>}/>
            <Route path={PAGE_CLUB_SETTINGS} element={<SettingsPage/>}/>
            <Route path={PAGE_CREATE_CLUB} element={<CreateClubPage/>}/>
            <Route path={PAGE_REGISTRATION} element={<ManualRegistrationPage/>}/>
            <Route path={PAGE_REGISTRATION_SUCCESS} element={<RegistrationSuccessPage/>}/>
            <Route path={PAGE_ACTIVITY} element={<CreateActivityLandingPage/>}/>
            <Route path={PAGE_CREATE_TASK} element={<CreateTaskPage/>}/>
            <Route path={PAGE_CREATE_EVENT} element={<CreateEventPage/>}/>

        </Routes>
    );
}