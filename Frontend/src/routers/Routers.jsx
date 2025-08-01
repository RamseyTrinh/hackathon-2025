// src/routers/Routers.jsx
import { Navigate, useRoutes } from 'react-router-dom';
import * as Pages from '@/pages';
import LayoutSideBar from '@/layouts/LayoutSidebar';
import { PATHS } from './path';
import NotFound from '@/pages/NotFound';

function AppRoutes() {

    return useRoutes([
        { path: PATHS.home, element: <Pages.Home /> },
        { path: PATHS.login, element: <Pages.Login /> },
        { path: PATHS.signup, element: <Pages.SignUp /> },
        { path: PATHS.resetPassword, element: <Pages.ResetPassword /> },
        { path: PATHS.resetPasswordForm, element: <Pages.ResetPasswordForm /> },
        { path: PATHS.about, element: <Pages.About /> },
        { path: PATHS.product, element: <Pages.Product /> },
        {
            path: '/',
            element: <LayoutSideBar />,
            children: [
                { path: PATHS.dashboard, element: <Pages.Dashboard /> },
                { path: PATHS.task, element: <Pages.Task /> },
                { path: PATHS.calendar, element: <Pages.Calendar /> },
                { path: PATHS.profile, element: <Pages.Profile /> },
                { path: PATHS.setting, element: <Pages.Setting /> },

            ],
        },

        // Các route khác
        { path: '/not-found', element: <NotFound /> },
        { path: '*', element: <Navigate to="/not-found" replace /> },
    ]);
}

function Routers() {
    return <AppRoutes />;
}

export default Routers;