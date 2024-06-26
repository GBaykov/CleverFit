import { ChangePasswordForm } from '@components/forms/changePassword';
import { ConfirmEmail } from '@components/forms/confirmEmail';
import { PATHS } from '@constants/constants';
import { resultData } from '@constants/resultData';
import { CalendarPage } from '@pages/calendarPage';
import { CommentsPage } from '@pages/commentsPage';
import { ErrorPage } from '@pages/errorPage';
import { FormPage } from '@pages/formPage';
import { MainPage } from '@pages/mainPage';
import { ProfilePage } from '@pages/profilePage';
import { ResultPage } from '@pages/resultPage';
import { SettingsPage } from '@pages/settingsPage';

import { Route, Routes } from 'react-router-dom';

export const routes = (
    <Routes>
        <Route path='/*' element={<ErrorPage />} />
        <Route path={PATHS.PROFILE} element={<ProfilePage />} />
        <Route path={PATHS.CALENDAR} element={<CalendarPage />} />
        <Route path={PATHS.INITIAL} element={<MainPage />} />
        <Route path={PATHS.MAIN} element={<MainPage />} />
        <Route path={PATHS.AUTH} element={<FormPage activePage='auth' />} />
        <Route path={PATHS.REGISTRATION} element={<FormPage activePage='registration' />} />
        <Route path={PATHS.CONFIRM_EMAIL} element={<ConfirmEmail />} />
        <Route path={PATHS.CHANGE_PASSWORD} element={<ChangePasswordForm />} />
        <Route path={PATHS.FEEDBACKS} element={<CommentsPage />} />
        <Route path={PATHS.SETTINGS} element={<SettingsPage />} />
        <Route
            path={PATHS.RESULT.ERROR_LOGIN}
            element={<ResultPage resultData={resultData.error_login} />}
        />
        <Route
            path={PATHS.RESULT.SUCCESS}
            element={<ResultPage resultData={resultData.success_signup} />}
        />
        <Route
            path={PATHS.RESULT.ERROR_USER_EXIST}
            element={<ResultPage resultData={resultData.error_user_exist} />}
        />
        <Route path={PATHS.RESULT.ERROR} element={<ResultPage resultData={resultData.error} />} />
        <Route
            path={PATHS.RESULT.ERROR_CHANGE_PASSWORD}
            element={<ResultPage resultData={resultData.error_change_password} />}
        />
        <Route
            path={PATHS.RESULT.SUCCESS_CHANGE_PASSWORD}
            element={<ResultPage resultData={resultData.success_change_password} />}
        />
        <Route
            path={PATHS.RESULT.ERROR_EMAIL_NO_EXIST}
            element={<ResultPage resultData={resultData.error_email_no_exist} />}
        />
        <Route
            path={PATHS.RESULT.ERROR_CHECK_EMAIL}
            element={<ResultPage resultData={resultData.error_check_email} />}
        />
    </Routes>
);
