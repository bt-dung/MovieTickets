import Home from "../pages/home/Home";
import Admin from '../pages/admin/Admin';
import User from '../pages/admin/users/Users'
import Movie from '../pages/admin/movies/Movies'
import Theater from '../pages/admin/theaters/Theater'
import MainLayoutAdmin from "../components/admin/mainlayout/MainLayoutAdmin";
import MainLayoutHome from "../components/home/mainLayout/MainLayoutHome";
import AddUser from "../pages/admin/users/AddUser";
import EditUser from "../pages/admin/users/EditUser/EditUser";
import AddTheater from "../pages/admin/theaters/AddTheater";
import EditTheater from "../pages/admin/theaters/EditTheater";
import DetailTheater from "../pages/admin/detailTheater/DetailTheater";
import ScheduleMain from "../pages/admin/schedule/ScheduleMain";
import Schedule from "../pages/admin/schedule/detailSchedule/Schedule";
import Screens from "../pages/admin/screens/Screens";
import DetailScreen from "../pages/admin/screens/detailScreen/DetailScreen";
import AddScreen from "../pages/admin/screens/AddScreen";

export const userRoutes = [
    { path: "/home", component: Home, layout: MainLayoutHome }
];

export const adminRoutes = [
    { path: '/dashboard', component: Admin, layout: MainLayoutAdmin },
    { path: '/users', component: User, layout: MainLayoutAdmin, allowedRoles: ["admin_role"] },
    { path: '/add-user', component: AddUser, layout: MainLayoutAdmin, allowedRoles: ["admin_role"] },
    { path: '/edit-user/:userId', component: EditUser, layout: MainLayoutAdmin, allowedRoles: ["admin_role"] },
    { path: '/movie', component: Movie, layout: MainLayoutAdmin },
    { path: '/theater', component: Theater, layout: MainLayoutAdmin },
    { path: '/detail-theater/:theaterId', component: DetailTheater, layout: MainLayoutAdmin },
    { path: '/add-theater', component: AddTheater, layout: MainLayoutAdmin, allowedRoles: ["admin_role"] },
    { path: '/edit-theater/:theaterId', component: EditTheater, layout: MainLayoutAdmin, allowedRoles: ["admin_role"] },
    { path: '/schedules', component: ScheduleMain, layout: MainLayoutAdmin, allowedRoles: ["admin_role"] },
    { path: '/detail-schedule/:theaterId', component: Schedule, layout: MainLayoutAdmin },
    { path: '/screens', component: Screens, layout: MainLayoutAdmin, allowedRoles: ["admin_role"] },
    { path: '/detail-screen/:theaterId', component: DetailScreen, layout: MainLayoutAdmin },
    { path: '/detail-screen/:screenId/seats', component: Seats, layout: MainLayoutAdmin },
    { path: '/add-screen/:theaterId', component: AddScreen, layout: MainLayoutAdmin },
];