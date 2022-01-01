import React from 'react';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import HomePage from '../layouts/HomePage';
import Cryptos from '../components/Cryptos';
import Portfolio from '../components/Portfolio';
import Statistics from '../components/Statistics';

const index = () => {
  return (
    <BrowserRouter>
      <Routes>
        <Route path='/' element={<HomePage />}>
          <Route path='' element={<Cryptos />} />
          <Route path='portifolio' element={<Portfolio />} />
          <Route path='statistics' element={<Statistics />} />
        </Route>
      </Routes>
    </BrowserRouter>
  );
};

export default index;
