import Home from "../pages/home/Home";
import Admin from '../pages/admin/Admin';
import MainLayoutAdmin from "../components/admin/mainlayout/MainLayoutAdmin";
export const userRoutes = [
    { path: "/home", component: Home, layout: null }
];

export const adminRoutes = [
    { path: '/admin', component: Admin, layout: MainLayoutAdmin }
];