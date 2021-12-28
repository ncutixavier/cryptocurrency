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
    setCoins(currentAsset.coins);
    setPrice(currentAsset.price);
  }, [currentAsset]);

  const [name, setName] = useState("");
  const [coins, setCoins] = useState("");
  const [price, setPrice] = useState("");

  const handleSubmit = (e) => {
    e.preventDefault();

    const data = {
      id: currentAsset.id,
      name,
      coins,
      price,
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
                        type="number"
                        placeholder="number of coins"
                        value={coins}
                        onChange={(e) => setCoins(e.target.value)}
                    />
                </div>
                <div >
                    <input
                        type="number"
                        placeholder="price per coin"
                        value={price}
                        onChange={(e) => setPrice(e.target.value)}
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



//<Link  to={`/cryptoDetails/${crypto.id}`} state={{from:crypto}}>More</Link>