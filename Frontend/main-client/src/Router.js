import React from 'react';
import { Route, Routes, BrowserRouter } from 'react-router-dom';
import Nav from './components/Nav/Nav';
import List from './pages/List/List';
import Detail from './pages/Detail/Detail';
import Main from './pages/Main/Main';

const Router = () => {
  return (
    <BrowserRouter>
      <Nav />
      <Routes>
        <Route path="/" element={<Main />} />
        <Route path="/search" element={<List />} />
        <Route path="/search/:id" element={<Detail />} />
      </Routes>
    </BrowserRouter>
  );
};

export default Router;
