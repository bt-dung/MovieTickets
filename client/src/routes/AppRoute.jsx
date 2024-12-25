import Home from "../pages/home/Home";
import Admin from '../pages/admin/Admin';
import MainLayoutAdmin from "../components/admin/mainlayout/MainLayoutAdmin";
export const userRoutes = [
    { path: "/home", component: Home }
];

export const adminRoutes = [
    { path: '/admin', component: Admin, layout: MainLayoutAdmin, allowedRoles: ["admin_role", "manager_role"] }
];