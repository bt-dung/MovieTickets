import React, { Fragment } from "react";
import {
  BrowserRouter as Router,
  Routes,
  Route,
  Navigate,
} from "react-router-dom";
import Login from "./pages/login/Login";
import PrivateRoute from "./routes/PrivateRoute";
import RoleRoute from "./routes/RoleRoute";
import { CurrentSeatProvider } from "./context/SeatContext";
import { UserProvider, useUser } from "./context/UserContext";
import { userRoutes, adminRoutes } from "./routes/AppRoute";
import { getRoutesByRole } from "./utils/routeHelper";
import Signup from "./pages/register/Signup";


const env = import.meta.env;
const BASE_URL_WEB = (env.VITE_BASE_URL_WEB);
const BASE_URL_ADMIN = (env.VITE_BASE_URL_ADMIN);

function App() {
  return (
    <Router>
      <UserProvider>
        <CurrentSeatProvider>
          <AppRoutes />
        </CurrentSeatProvider>
      </UserProvider>
    </Router>
  );
}
function AppRoutes() {
  const { user, isLoading } = useUser();
  if (isLoading) {
    return <div>Loading...</div>;
  }

  const BASE_URL = user?.role === "user_role" ? BASE_URL_WEB : BASE_URL_ADMIN;

  const availableRoutes = getRoutesByRole(user, userRoutes, adminRoutes);
  return (
    <>
      <div className="App">
        <Routes>
          <Route path="/login" element={<Login />} />
          <Route path="/signup" element={<Signup />} />
          {availableRoutes.map((route, index) => {
            const Page = route.component;
            const allowedRoles = route.allowedRoles || ["user_role", "manager_role", "admin_role"];
            const Layout = route.layout || Fragment;
            return (
              <Route
                key={index}
                path={`${BASE_URL}${route.path}`}
                element={
                  <PrivateRoute>
                    <RoleRoute allowedRoles={allowedRoles}>
                      <Layout>
                        <Page />
                      </Layout>
                    </RoleRoute>
                  </PrivateRoute>
                }
              />
            );
          })}
          <Route path="*" element={<Navigate to="/login" replace />} />
        </Routes>
      </div>
    </>
  );
}

export default App;
