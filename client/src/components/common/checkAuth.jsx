import { Navigate, Outlet } from "react-router-dom";
import { useSelector } from "react-redux";

const CheckAuth = () => {
    const { isAuthenticated } = useSelector((state) => state.auth);

    if (!isAuthenticated) {
        return <Navigate to="/auth/login" replace />;
    }
    return <Outlet />;
};

export default CheckAuth;

