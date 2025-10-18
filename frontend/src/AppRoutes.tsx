import {Route, Routes} from 'react-router-dom';
import RegistrationSuccessPage from "./onboarding/RegistrationSuccessPage.tsx";
import {
    ATTENDANCE_PAGE,
    ATTENDANCE_REPORTS,
    ATTENDANCE_SUCCESS,
    COMPARISON_ANALYTICS,
    MAIN_ANALYTICS,
    PAGE_ACTIVITY,
    PAGE_ADD_MEMBER,
    PAGE_CALENDAR,
    PAGE_CLUB_SETTINGS,
    PAGE_CREATE_CLUB,
    PAGE_CREATE_EVENT,
    PAGE_CREATE_SUCCESS,
    PAGE_CREATE_TASK,
    PAGE_DATABASE,
    PAGE_DELETE_SUCCESS,
    PAGE_GANTT,
    PAGE_HOME,
    PAGE_LOGIN,
    PAGE_MASS_IMPORT,
    PAGE_REGISTRATION,
    PAGE_REGISTRATION_SUCCESS,
    PAGE_UPDATE_EVENT,
    PAGE_UPDATE_SUCCESS,
    PAGE_UPDATE_TASK
} from "./PathConstants.tsx";
import LoginPage from "./onboarding/LoginInPage.tsx";
import AddMembersPage from "./onboarding/AddMembersToClubPage.tsx";
import SettingsPage from "./onboarding/ClubSettingPage.tsx";
import CreateClubPage from "./onboarding/CreateAClubPage.tsx";
import ManualRegistrationPage from "./onboarding/ManualRegistrationPage.tsx";
import CreateTaskPage from "./activityManagement/CreateTask.tsx";
import CreateEventPage from "./activityManagement/CreateEvent.tsx";
import CalendarViewPage from "./activityView/calendar.tsx";
import GanttChartPage from "./activityView/GanttChart.tsx";
import TaskHomePage from "./activityView/HomePage.tsx";
import UpdateEventPage from './activityManagement/UpdateEvent.tsx';
import ActivityDeletePage from "./activityManagement/DeleteSuccess.tsx";
import ActivitySuccessPage from "./activityManagement/CreateSuccess.tsx";
import ActivityUpdatePage from "./activityManagement/UpdateSuccess.tsx";
// @ts-ignore
import CreateActivityLandingPage from './activityManagement/CreateActivity.tsx';
import UpdateTaskPage from "./activityManagement/UpdateTask.tsx";
import EventSuccessPage from "./attendance/EventSuccessPage.tsx";
import EventRegistrationForm from "./attendance/EventRegistrationForm.tsx";
import DatabaseView from './activityView/DatabaseView.tsx';
import MassImportPage from "./activityManagement/MassImport.tsx";
import AnalyticsPage from "./analytics/MainAnalyticsReport.tsx";
import MultiClubComparisonPage from "./analytics/ComparisonAnalyticsReport.tsx";
import AttendanceReportPage from './analytics/AttendanceReports.tsx';


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
            <Route path={PAGE_CALENDAR} element={<CalendarViewPage/>}/>
            <Route path={PAGE_GANTT} element={<GanttChartPage/>}/>
            <Route path={PAGE_HOME} element={<TaskHomePage/>}/>
            <Route path={PAGE_UPDATE_EVENT} element={<UpdateEventPage/>}/>
            <Route path={PAGE_UPDATE_TASK} element={<UpdateTaskPage/>}/>
            <Route path={PAGE_CREATE_SUCCESS} element={<ActivitySuccessPage/>}/>
            <Route path={PAGE_UPDATE_SUCCESS} element={<ActivityUpdatePage/>}/>
            <Route path={PAGE_DELETE_SUCCESS} element={<ActivityDeletePage/>}/>
            <Route path={ATTENDANCE_PAGE} element={<EventRegistrationForm/>}/>
            <Route path={ATTENDANCE_SUCCESS} element={<EventSuccessPage/>}/>
            <Route path={PAGE_DATABASE} element={<DatabaseView/>}/>
            <Route path={PAGE_MASS_IMPORT} element={<MassImportPage/>}/>
            <Route path={MAIN_ANALYTICS} element={<AnalyticsPage/>}/>
            <Route path={COMPARISON_ANALYTICS} element={<MultiClubComparisonPage/>}/>
            <Route path={ATTENDANCE_REPORTS} element={<AttendanceReportPage/>}/>


        </Routes>
    );
}