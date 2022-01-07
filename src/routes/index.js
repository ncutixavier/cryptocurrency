import React from 'react';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import HomePage from '../layouts/HomePage';
import Cryptos from '../components/Cryptos';
import Portfolio from '../components/Portfolio';
import WatchList from '../components/watchList';
import Chart from '../components/Chart';

const index = () => {
  return (
    <BrowserRouter>
      <Routes>
        <Route path='/' element={<HomePage />}>
          <Route path='' element={<Cryptos />} />
          <Route path='portifolio' element={<Portfolio />} />
          <Route path='watchList' element={<WatchList />} />
          <Route path='chart' element={<Chart />} />
        </Route>
      </Routes>
    </BrowserRouter>
  );
};

export default index;
