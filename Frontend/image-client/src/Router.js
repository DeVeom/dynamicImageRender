import React from 'react';
import { Route, Routes, BrowserRouter } from 'react-router-dom';
import Report from './pages/Report/Report';

const Router = () => {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/report" element={<Report />} />
      </Routes>
    </BrowserRouter>
  );
};

export default Router;
