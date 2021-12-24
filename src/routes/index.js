import React from 'react';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import HomePage from '../layouts/HomePage';
import Cryptocurrencies from '../components/Cryptocurrencies';
import Portfolio from '../components/Portfolio';
import Statistics from '../components/Statistics';
import AddAsset from '../components/AddAset';
import UpdateAsset from '../components/UpdateAsset';


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
        </Route>
      </Routes>
    </BrowserRouter>
  );
};

export default index;
