import { lazy } from "react";
import { Navigate } from "react-router-dom";

const Dashboard = lazy(() => import("../pages/Dashboard"));
const AccountUser = lazy(() => import("../pages/Account/User"));
const AccountManager = lazy(() => import("../pages/Account/Manager"));
const ListTours = lazy(() => import("../pages/Tour/index"));
const StaffTours = lazy(() => import("../pages/Tour/staffTour"));
const ExpListTours = lazy(() => import("../pages/Tour/ExpTour"));
const CreateTour = lazy(() => import("../pages/Tour/create"));
const EditTour = lazy(() => import("../pages/Tour/edit"));
const ViewTour = lazy(() => import("../pages/Tour/view"));
const StaffViewTour = lazy(() => import("../pages/Tour/StaffView"));
const LoginPage = lazy(() => import("../pages/Auth/Login"));
const ProfilePage = lazy(() => import("../pages/Auth/Profile"));
const CancelTour = lazy(() => import("../pages/Book/cancel"));
const BooksTour = lazy(() => import("../pages/Book"));
const Calendar = lazy(() => import("../pages/Calendar/Calendar"));



export const routes = [
    {

        pageTitle: " Dashboard Explore Nest",
        url: "/dashboard",
        page: <Dashboard />,
    },
    {
        pageTitle: " Account Explore Nest",
        url: "/account/manager",
        page: <AccountManager />,
    },
    {
        pageTitle: " Account Explore Nest",
        url: "/account/user",
        page: <AccountUser />,
    },

    {
        pageTitle: " List Tours Explore Nest",
        url: "/tour",
        page: <ListTours />,
    },
    {
        pageTitle: " List Tours Explore Nest",
        url: "/tour/exp",
        page: <ExpListTours />,
    },
    {
        pageTitle: " List Tours Explore Nest",
        url: "/tour/staff",
        page: <StaffTours />,
    },
    {
        pageTitle: " List Tours Explore Nest",
        url: "/tour/staff/view/:id",
        page: <StaffViewTour />,
    },
    {
        pageTitle: " List Tours Explore Nest",
        url: "/tour/view/:id",
        page: <ViewTour />,
    },

    {
        pageTitle: " Create tour Explore Nest",
        url: "/tour/create",
        page: <CreateTour />,
    },
    {
        pageTitle: " Edit Tours Explore Nest",
        url: "/tour/edit/:id",
        page: <EditTour />,
    },

    {
        pageTitle: " Booking Explore Nest",
        url: "/book",
        page: <BooksTour />,
    },
    {
        pageTitle: " Cancel Booking Explore Nest",
        url: "/book/cancel",
        page: <CancelTour />,
    },

    {
        pageTitle: " Calendar Explore Nest",
        url: "/calendar",
        page: <Calendar />,
    },

    {
        pageTitle: " Login Page | TailAdmin - Tailwind CSS Admin Dashboard Template",
        url: "/login",
        page: <LoginPage />,
    },

    {
        pageTitle: " Profile Page | TailAdmin - Tailwind CSS Admin Dashboard Template",
        url: "/profile",
        page: <ProfilePage />,
    },

    {
        url: '/',
        pageTitle: " Dashboard | TailAdmin - Tailwind CSS Admin Dashboard Template",
        page: <Navigate to="/dashboard" replace />
    }


];
