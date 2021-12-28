import React, { useState, useEffect } from 'react';
import axios from "axios";
import { Link } from 'react-router-dom';

const Cryptocurrencies = () => {

  const [cryptocurrencies, setCryptocurrencies] = useState([])


  const retriveCryptocurrencies = async () => {
    const response = await axios.get("https://pro-api.coinmarketcap.com/v1/cryptocurrency/listings/latest?CMC_PRO_API_KEY=e32677da-acc9-4c97-8a8d-d975216e2282")
    return response.data.data;
  };

  useEffect(() => {
    const getAllCryptocurrencies = async () => {
      const allCryptocurrencies = await retriveCryptocurrencies()
      if (allCryptocurrencies) setCryptocurrencies(allCryptocurrencies)
    };
    getAllCryptocurrencies();
  }, []);

  const cryptos = cryptocurrencies.map((crypto, id) => {
    return (
      <ul key={id}>
        <li>{crypto.name}</li>
        <Link to={`/cryptoDetails/${crypto.id}`} state={{ from: crypto }}>More</Link>
      </ul>
    )
  })


  return (
    <div>
      <h1>Latest cryptocurrencies</h1>
        {cryptos}
    </div>
  );
};


export default (Cryptocurrencies);