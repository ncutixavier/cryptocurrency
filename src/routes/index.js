import React from 'react';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import HomePage from '../layouts/HomePage';
import Cryptocurrencies from '../components/cryptocurrencies/Cryptocurrencies';
import Portfolio from '../components/portfolio/Portfolio';
import Statistics from '../components/statistics/Statistics';
import AddAsset from '../components/portfolio/AddAset';
import UpdateAsset from '../components/portfolio/UpdateAsset';
import CryptoDetails from '../components/cryptocurrencies/CryptoDetails';


const index = () => {
  return (
    <BrowserRouter>
      <Routes>
        <Route path='/' element={<HomePage />}>
          
          <Route path='' element={<Cryptocurrencies />} />
          <Route path='portifolio' element={<Portfolio />} />
          <Route path='statistics' element={<Statistics />} />
          <Route path='addAsset' element={<AddAsset />} />
          <Route path='updateAsset/:id' element={<UpdateAsset />} />
          <Route path='cryptoDetails/:id' element={<CryptoDetails />} />
        </Route>
      </Routes>
    </BrowserRouter>
  );
};

export default index;
