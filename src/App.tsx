import { BrowserRouter, Routes, Route } from 'react-router-dom';
import GlobalStyles from '@/components/GlobalStyles';
import Navibar from '@/components/Navibar';
import Login from '@/pages/Login';
import NotFound from '@/pages/NotFound';
import Homepage from '@/pages/Homepage';
import { AuthProvider } from './context/AuthProvider';
import MyPage from './pages/MyPage';
import OrderPage from './pages/OrderPage';
import { ToastContainer } from 'react-toastify';
import ThemeProductPage from './pages/ThemeProductPage';
import { ROUTES } from './constants/routes';

function App() {
  return (
    <BrowserRouter>
      <AuthProvider>
        <GlobalStyles />
        <Navibar />
        <ToastContainer position="top-center" />
        <Routes>
          <Route path={ROUTES.HOME} element={<Homepage />} />
          <Route path={ROUTES.LOGIN} element={<Login />} />
          <Route path="/order/:productId" element={<OrderPage />} />
          <Route path={ROUTES.MY} element={<MyPage />} />
          <Route path="/themes/:themeId" element={<ThemeProductPage />} />
          <Route path="*" element={<NotFound />} />
        </Routes>
      </AuthProvider>
    </BrowserRouter>
  );
}

export default App;
