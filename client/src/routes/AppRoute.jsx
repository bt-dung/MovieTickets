import Home from "../pages/home/Home";
import Admin from '../pages/admin/Admin';
import User from '../pages/admin/users/Users'
import MainLayoutAdmin from "../components/admin/mainlayout/MainLayoutAdmin";
import MainLayoutHome from "../components/home/mainLayout/MainLayoutHome";
import AddUser from "../pages/admin/users/AddUser";

export const userRoutes = [
    { path: "/home", component: Home, layout: MainLayoutHome }
];

export const adminRoutes = [
    { path: '/dashboard', component: Admin, layout: MainLayoutAdmin },
    { path: '/users', component: User, layout: MainLayoutAdmin },
    { path: '/add-user', component: AddUser, layout: MainLayoutAdmin }
];