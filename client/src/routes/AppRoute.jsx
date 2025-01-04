import Home from "../pages/home/Home";
import Admin from '../pages/admin/Admin';
import User from '../pages/admin/users/Users'
import Movie from '../pages/admin/movies/Movies'
import Theater from '../pages/admin/theaters/Theater'
import MainLayoutAdmin from "../components/admin/mainlayout/MainLayoutAdmin";
import MainLayoutHome from "../components/home/mainLayout/MainLayoutHome";
import AddUser from "../pages/admin/users/AddUser";
import { useUser } from "../context/UserContext";

export const userRoutes = [
    { path: "/home", component: Home, layout: MainLayoutHome }
];

export const adminRoutes = [
    { path: '/dashboard', component: Admin, layout: MainLayoutAdmin },
    { path: '/users', component: User, layout: MainLayoutAdmin },
    { path: '/add-user', component: AddUser, layout: MainLayoutAdmin },
    { path: '/movie', component: Movie, layout: MainLayoutAdmin },
    { path: '/theater', component: Theater, layout: MainLayoutAdmin }

];