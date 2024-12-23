import { Routes, Route, Navigate } from "react-router-dom";
import Login from "./pages/login/Login";
import Home from "./pages/home/Home";
import Admin from "./pages/admin/Admin";
import Header from "./components/admin/header/Header";

function App() {
  return (
    <>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/login" element={<Login />} />
        <Route path="/admin/*" element={<Admin />} />
        <Route path="/test" element={<Header />} />
      </Routes>
    </>
  );
}

export default App;
