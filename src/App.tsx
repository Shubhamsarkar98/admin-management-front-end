import { Suspense, lazy } from 'react';
import { BrowserRouter, Routes, Route, Navigate, Outlet } from 'react-router-dom';
import { useSelector } from 'react-redux';
import { selectIsLogin } from './redux/authSlice';
import { CircularProgress } from '@mui/material';


const Login = lazy(() => import('./pages/Login'));
const Dashboard = lazy(() => import('./pages/Dashboard'));


const LoadingScreen = () => (
  <div className="flex h-screen items-center justify-center">
    <CircularProgress />
  </div>
);

const ProtectedRoute = () => {
  const isLogin = useSelector(selectIsLogin);
  return isLogin ? <Outlet /> : <Navigate to="/login" replace />;
};


const PublicRoute = () => {
  const isLogin = useSelector(selectIsLogin);
  return !isLogin ? <Outlet /> : <Navigate to="/dashboard" replace />;
};

function App() {
  return (
    <BrowserRouter>
      <Suspense fallback={<LoadingScreen />}>
        <Routes>
          <Route element={<PublicRoute />}>
            <Route path="/login" element={<Login />} />
          </Route>

          <Route element={<ProtectedRoute />}>
            <Route path="/dashboard" element={<Dashboard />} />
          </Route>

          <Route path="/" element={<Navigate to="/dashboard" replace />} />

          <Route path="*" element={<Navigate to="/" replace />} />
        </Routes>
      </Suspense>
    </BrowserRouter>
  );
}

export default App;