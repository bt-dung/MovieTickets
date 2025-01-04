import Home from "../pages/home/Home";
import Admin from '../pages/admin/Admin';
import MainLayoutAdmin from "../components/admin/mainlayout/MainLayoutAdmin";
import User from "../pages/admin/users/Users";
import Movie from "../pages/admin/movies/Movies";
import Theater from "../pages/admin/theaters/Theater";
import Schedule from "../pages/admin/schedule/Schedule";
import Tickets from "../pages/admin/ticket/Ticket";
import Services from "../pages/admin/service/Service";

export const userRoutes = [
    { path: "/home", component: Home }
];

export const adminRoutes = [
    { path: '/admin', component: Admin, layout: MainLayoutAdmin, allowedRoles: ["admin_role", "manager_role"] },
    { path: '/admin/user', component: User, layout: MainLayoutAdmin, allowedRoles: ["admin_role"] },
    { path: '/admin/movie', component: Movie, layout: MainLayoutAdmin, allowedRoles: ["admin_role", "manager_role"] },
    { path: '/admin/theater', component: Theater, layout: MainLayoutAdmin, allowedRoles: ["admin_role", "manager_role"] },
    { path: '/admin/schedule', component: Schedule, layout: MainLayoutAdmin, allowedRoles: ["admin_role", "manager_role"] },
    { path: '/admin/tickets', component: Tickets, layout: MainLayoutAdmin, allowedRoles: ["admin_role", "manager_role"] },
    { path: '/admin/services', component: Services, layout: MainLayoutAdmin, allowedRoles: ["admin_role", "manager_role"] },
];