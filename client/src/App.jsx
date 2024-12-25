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
import Admin from "./pages/admin/Admin";

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
  const { user } = useUser();
  console.log(user);

  const availableRoutes = getRoutesByRole(user, userRoutes, adminRoutes);
  console.log("availableRoutes", availableRoutes);

  return (
    <>
      <div className="App">
        <Routes>
          <Route path="/login" element={<Login />} />
          {availableRoutes.map((route, index) => {
            const Page = route.component;
            let Layout = route.layout || <Fragment />;

            return (
              <Route
                key={index}
                path={route.path}
                element={
                  <PrivateRoute>
                    <RoleRoute allowedRoles={route.allowedRoles}>
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
