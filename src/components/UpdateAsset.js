import React, { useEffect, useState } from 'react';
import { connect } from "react-redux";
import { useNavigate, useParams } from "react-router";
import { toast } from "react-toastify";

const UpdateAsset = ({ datas, updateAsset }) => {
  const { id } = useParams();
  const navigate = useNavigate();

  const currentAsset = datas.find(
    (asset) => asset.id === parseInt(id)
  );

  useEffect(() => {
    setName(currentAsset.name);
    setSymbol(currentAsset.symbol);
    setPrice(currentAsset.price);
    setTotal_supply(currentAsset.total_supply);
    setMarket_cap(currentAsset.market_cap);
    setCirculating_supply(currentAsset.circulating_supply);
    setVolume_24h(currentAsset.volume_24h);
    setLast_updated(currentAsset.last_updated);
    setCmc_rank(currentAsset.cmc_rank);
  }, [currentAsset]);


  const [name, setName] = useState("");
  const [symbol, setSymbol] = useState("");
  const [price, setPrice] = useState("");
  const [total_supply, setTotal_supply] = useState("");
  const [market_cap, setMarket_cap] = useState("");
  const [circulating_supply, setCirculating_supply] = useState("");
  const [volume_24h, setVolume_24h] = useState("");
  const [last_updated, setLast_updated] = useState("");
  const [cmc_rank, setCmc_rank] = useState("");

  const handleSubmit = (e) => {
    e.preventDefault();

    const data = {
      id: currentAsset.id,
      name,
      symbol,
      price,
      total_supply,
      market_cap,
      circulating_supply,
      volume_24h,
      last_updated,
      cmc_rank,
    };
    updateAsset(data);
    toast.success("Asset updated successfully!!");
    navigate("/portifolio");
  };

  return (
    <div>
       <h1>Update Asset</h1>
            <form onSubmit={handleSubmit}>
                <div >
                    <input
                        type="text"
                        placeholder="name"
                        value={name}
                        onChange={(e) => setName(e.target.value)}
                    />
                </div>
                <div >
                    <input
                        type="text"
                        placeholder="symbol"
                        value={symbol}
                        onChange={(e) => setSymbol(e.target.value)}
                    />
                </div>
                <div >
                    <input
                        type="number"
                        placeholder="price"
                        value={price}
                        onChange={(e) => setPrice(e.target.value)}
                    />
                </div>
                <div >
                    <input
                        type="number"
                        placeholder="total_supply"
                        value={total_supply}
                        onChange={(e) => setTotal_supply(e.target.value)}
                    />
                </div>
                <div >
                    <input
                        type="number"
                        placeholder="market_cap"
                        value={market_cap}
                        onChange={(e) => setMarket_cap(e.target.value)}
                    />
                </div>
                <div >
                    <input
                        type="number"
                        placeholder="circulating_supply"
                        value={circulating_supply}
                        onChange={(e) => setCirculating_supply(e.target.value)}
                    />
                </div>
                <div >
                    <input
                        type="number"
                        placeholder="volume_24h"
                        value={volume_24h}
                        onChange={(e) => setVolume_24h(e.target.value)}
                    />
                </div>
                <div >
                    <input
                        type="date"
                        placeholder="last_updated"
                        value={last_updated}
                        onChange={(e) => setLast_updated(e.target.value)}
                    />
                </div>
                <div >
                    <input
                        type="number"
                        placeholder="cmc_rank"
                        value={cmc_rank}
                        onChange={(e) => setCmc_rank(e.target.value)}
                    />
                </div>

                <div >
                    <input
                        type="submit"
                        value="update Asset"
                    />
                </div>
            </form>

    </div>
  )
}

const mapStateToProps = (state) => ({
  datas: state,
});
const mapDispatchToProps = (dispatch) => ({
  updateAsset: (data) => {
    dispatch({ type: "UPDATE_ASSET", payload: data });
  },
});

export default connect(mapStateToProps, mapDispatchToProps)(UpdateAsset);