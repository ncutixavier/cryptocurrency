import React, { useState, useEffect } from 'react';
import axios from "axios";
import { connect } from "react-redux";
import { toast } from "react-toastify";

const Cryptocurrencies = ({ datas, addAsset }) => {

  const [cryptocurrencies, setCryptocurrencies] = useState([])
  const [assets, setAssets] = useState(datas)
  console.log(assets)

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
        <a onClick={() => { addAsset(crypto); toast.success("Asset added successfully!!") }}>Add to Portfolio</a>
      </ul>)
  })


  return (
    <div>
      <h1>Latest cryptocurrencies</h1>
      {cryptos}
    </div>
  );
};

const mapStateToProps = (state) => ({
  datas: state,
});
const mapDispatchToProps = (dispatch) => ({
  addAsset: (data) => {
    dispatch({ type: "ADD_ASSET", payload: data });
  },
});

export default connect(mapStateToProps, mapDispatchToProps)(Cryptocurrencies);