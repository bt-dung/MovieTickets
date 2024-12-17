import {
  BrowserRouter as Router,
  Routes,
  Route,
  Navigate,
} from "react-router-dom";
import Login from "./pages/login/Login";

function App() {
  return (
    <>
      {/* <Router>
        <div className="App">
          <Routes>
            {publicRoutes.map((route, index) => {
              const Page = route.component;
              let Layout = MainLayout;

              if (route.layout) {
                Layout = route.layout;
              } else if (route.layout === null) {
                Layout = Fragment;
              }

              return (
                <Route
                  key={index}
                  path={route.path}
                  element={
                    <Layout>
                      <Page />
                    </Layout>
                  }
                />
              );
            })}
              
            {privateRoutes.map((route, index) => {
              const Page = route.component;
              let Layout = MainLayout;
              if (route.layout) {
                Layout = route.layout;
              } else if (route.layout === null) {
                Layout = Fragment;
              }
              const allowedRoles = route.allowedRoles || [
                "ROLE_ADMIN",
                "ROLE_MANAGER",
              ];
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
      </Router> */}
      <Login />
    </>
  );
}

export default App;
