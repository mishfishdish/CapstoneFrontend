import {Route, Routes} from 'react-router-dom';
import LoginPage from "./onboarding/pages/LoginInPage";

export default function AppRoutes() {
    return (
        <Routes>
            <Route path="/" element={<LoginPage/>}/>
        </Routes>
    );
}