import { Suspense, lazy } from 'react';
import { BrowserRouter, Routes, Route, Navigate} from 'react-router-dom';

import { routes } from './routes/routes';
import { AppLayout } from './layout/AppLayout';
import { LoadingScreen, ProtectedRoute, PublicRoute } from './components/ProtectedRoute';
import Scanner from './pages/QrScan/Scanner';

const Login = lazy(() => import('./pages/Login'));
const Dashboard = lazy(() => import('./pages/Dashboard'));
const QrScanner = lazy(() => import('./pages/QrScan'));


function App() {
  return (
    <BrowserRouter>
      <Suspense fallback={<LoadingScreen />}>
        <Routes>
          <Route element={<PublicRoute />}>
            <Route path={routes.login} element={<Login />} />
          </Route>
          <Route element={<ProtectedRoute />}>
            <Route element={<AppLayout />}>
              <Route path={routes.dashboard} element={<Dashboard />} />
              <Route path={routes.homepage} element={<Navigate to={routes.dashboard} replace />} />
              <Route path={routes.qrcode} element={<Scanner />} />
              <Route path={routes.addqrcode} element={<QrScanner />} />
            </Route>
          </Route>
          <Route path="*" element={<Navigate to={routes.homepage} replace />} />
        </Routes>
      </Suspense>
    </BrowserRouter>
  );
}

export default App;
