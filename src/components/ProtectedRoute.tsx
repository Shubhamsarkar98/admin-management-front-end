import { CircularProgress } from "@mui/material";
import { useSelector } from "react-redux";
import { Navigate, Outlet } from "react-router-dom";
import { routes } from "../routes/routes";
import { selectIsLogin } from "../redux/authSlice";

export const LoadingScreen = () => (
  <div className="flex h-screen items-center justify-center">
    <CircularProgress />
  </div>
);


export const ProtectedRoute = () => {
  const isLogin = useSelector(selectIsLogin);
  return isLogin ? <Outlet /> : <Navigate to={routes.login} replace />;
};


export const PublicRoute = () => {
  const isLogin = useSelector(selectIsLogin);
  return !isLogin ? <Outlet /> : <Navigate to={routes.dashboard} replace />;
};