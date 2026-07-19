import { BrowserRouter, Routes, Route } from "react-router-dom";

import Login from "../pages/Login";
import Register from "../pages/Register";
import DashboardPage from "../pages/DashboardPage";
import Movies from "../pages/Movies";
import AddMovie from "../pages/AddMovie";
import EditMovie from "../pages/EditMovie";
import NotFound from "../pages/NotFound";
import ForgotPassword from "../pages/ForgotPassword";


const AppRoutes = () => {
    return (
        <BrowserRouter>
            <Routes>
                <Route path="/" element={<Login />} />
                <Route path="/login" element={<Login />} />
                <Route path="/register" element={<Register />} />
                <Route path="/dashboard" element={<DashboardPage />}/>
                <Route path="/movies" element={<Movies />} />
                <Route path="/movies/add" element={<AddMovie />} />
                <Route path="/movies/edit/:id" element={<EditMovie />} />
                <Route path="*" element={<NotFound />} />
                <Route path="/forgot-password" element={<ForgotPassword />} />
            </Routes>
        </BrowserRouter>
    );
};

export default AppRoutes;