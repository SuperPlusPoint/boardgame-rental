import { BrowserRouter, Routes, Route } from 'react-router-dom';
import About from './pages/About';
import ListAdd from './pages/ListAdd';
import Login from './pages/Login';
import NotFound from './pages/NotFound';
import Setting from './pages/Setting';
import List from './pages/List';
import PrivateRouter from './PrivateRouter';
import KakaoLogin from './pages/KakaoLogin';

const Router = () => {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<About />} />
        <Route path="/login" element={<Login />} />
        <Route path="/login/kakao" element={<KakaoLogin />} />
        <Route element={<PrivateRouter />}>
          <Route path="/setting" element={<Setting />} />
          <Route path="/list/add" element={<ListAdd />} />
        </Route>
        <Route path="/list/:userId" element={<List />} />
        <Route path="*" element={<NotFound />} />
      </Routes>
    </BrowserRouter>
  );
};

export default Router;
