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
import { UserProvider, useUser } from "./context/UserContext";
import { userRoutes, adminRoutes } from "./routes/AppRoute";
import { getRoutesByRole } from "./utils/routeHelper";

function App() {
  return (
    <Router>
      <UserProvider>
        <AppRoutes />
      </UserProvider>
    </Router>
  );
}
function AppRoutes() {
  const { user, isLoading } = useUser();
  if (isLoading) {
    return <div>Loading...</div>;
  }
  const availableRoutes = getRoutesByRole(user, userRoutes, adminRoutes);
  return (
    <>
      <div className="App">
        <Routes>
          <Route path="/login" element={<Login />} />
          {availableRoutes.map((route, index) => {
            const Page = route.component;
            const allowedRoles = route.allowedRoles || ["user_role", "manager_role", "admin_role"];
            const Layout = route.layout || Fragment;
            return (
              <Route
                key={index}
                path={route.path}
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
