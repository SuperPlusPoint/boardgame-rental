import { BrowserRouter, Routes, Route } from 'react-router-dom';
import About from './pages/About';
import ListAdd from './pages/ListAdd';
import Login from './pages/Login';
import NotFound from './pages/NotFound';
import Setting from './pages/Setting';
import List from './pages/List';
import PrivateRouter from './PrivateRouter';
import KakaoLogin from './pages/KakaoLogin';
import Layout from './layout/Layout';
import MyPage from './pages/MyPage';

const Router = () => {
  return (
    <BrowserRouter>
      <Routes>
        <Route element={<Layout />}>
          <Route path="/" element={<About />} />
          <Route path="/login" element={<Login />} />
          <Route path="/login/kakao" element={<KakaoLogin />} />
          <Route element={<PrivateRouter />}>
            <Route path="/list" element={<List />} />
            <Route path="/setting" element={<Setting />} />
            <Route path="/add" element={<ListAdd />} />
            <Route path="/my" element={<MyPage />} />
          </Route>
          <Route path="/list/:userId" element={<List />} />
          <Route path="*" element={<NotFound />} />
        </Route>
      </Routes>
    </BrowserRouter>
  );
};

export default Router;
