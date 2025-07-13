import {Route, Routes} from 'react-router-dom';
import RegistrationSuccessPage from "./onboarding/RegistrationSuccessPage.tsx";
import {
    PAGE_ADD_MEMBER,
    PAGE_CLUB_SETTINGS,
    PAGE_CREATE_CLUB,
    PAGE_LOGIN,
    PAGE_REGISTRATION,
    PAGE_REGISTRATION_SUCCESS
} from "./PathConstants.tsx";
import LoginPage from "./onboarding/LoginInPage.tsx";
import AddMembersPage from "./onboarding/AddMembersToClubPage.tsx";
import SettingsPage from "./onboarding/ClubSettingPage.tsx";
import CreateClubPage from "./onboarding/CreateAClubPage.tsx";
import ManualRegistrationPage from "./onboarding/ManualRegistrationPage.tsx";


export default function AppRoutes() {
    return (
        <Routes>
            <Route path={PAGE_LOGIN} element={<LoginPage/>}/>
            <Route path={PAGE_ADD_MEMBER} element={<AddMembersPage/>}/>
            <Route path={PAGE_CLUB_SETTINGS} element={<SettingsPage/>}/>
            <Route path={PAGE_CREATE_CLUB} element={<CreateClubPage/>}/>
            <Route path={PAGE_REGISTRATION} element={<ManualRegistrationPage/>}/>
            <Route path={PAGE_REGISTRATION_SUCCESS} element={<RegistrationSuccessPage/>}/>
        </Routes>
    );
}