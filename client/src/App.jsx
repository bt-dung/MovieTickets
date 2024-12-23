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
    <UserProvider>
      <Router>
        <AppRoutes />
      </Router>
    </UserProvider>
  );
}
function AppRoutes() {
  const { userRole } = useUser();

  const availableRoutes = getRoutesByRole(userRole, userRoutes, adminRoutes);
  return (
    <>
      <Router>
        <div className="App">
          <Routes>
            <Route path="/login" element={<Login />} />
            {availableRoutes.map((route, index) => {
              const Page = route.component;
              let Layout = route.layout || MainLayout;

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
      </Router>
    </>
  );
}

export default App;
