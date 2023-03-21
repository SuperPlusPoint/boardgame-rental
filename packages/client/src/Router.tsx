import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom';
import About from './pages/About';
import List from './pages/List';
import ListAdd from './pages/ListAdd';
import Login from './pages/Login';
import NotFound from './pages/NotFound';
import Setting from './pages/Setting';

const Router = () => {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Navigate replace to="/about" />} />
        <Route path="/about" element={<About />} />
        <Route path="/login" element={<Login />} />
        <Route path="/setting" element={<Setting />} />
        <Route path="/list" element={<Login />} />
        <Route path="/list/:userId" element={<List />} />
        <Route path="/list/add" element={<ListAdd />} />
        <Route path="*" element={<NotFound />} />
      </Routes>
    </BrowserRouter>
  );
};

export default Router;
