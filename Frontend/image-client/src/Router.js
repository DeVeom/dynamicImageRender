import React from 'react';
import { Route, Routes, BrowserRouter } from 'react-router-dom';
import BigReportLayout from './components/BigReportLayout/BigReportLayout';
import SmallReportLayout from './components/SmallReportLayout/SmallReportLayout';

const Router = () => {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/bigreport/:id" element={<BigReportLayout />} />
        <Route path="/smallreport/:id" element={<SmallReportLayout />} />
      </Routes>
    </BrowserRouter>
  );
};

export default Router;
