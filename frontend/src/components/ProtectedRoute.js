import { useSelector } from "react-redux";
import { Outlet, Navigate } from "react-router-dom";

const ProtectedRotue = () => {
    const token = useSelector(state => state.user.token)
    if (!token) {
        return <Navigate to="/login" />
    }
    return <Outlet />
}

export default ProtectedRotue;