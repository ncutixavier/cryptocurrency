import { toast } from "react-toastify";
import React, { useState } from 'react';
import { connect } from "react-redux";
import { useLocation } from "react-router-dom";


const CryptoDetails = ({ datas, addAsset }) => {

  const [assets, setAssets] = useState(datas)

  const location = useLocation();
  console.log(assets)

  const {from } = location.state;
  console.log(from)

return (
  <div>
    <ul key={from.id}>
        <li>{from.name}</li>
        <a onClick={() => { addAsset(from); toast.success("Asset added successfully!!") }}>Add to Portfolio</a>
      </ul>
  </div>
)
}


const mapStateToProps = (state) => ({
  datas: state,
});
const mapDispatchToProps = (dispatch) => ({
  addAsset: (data) => {
    dispatch({ type: "ADD_ASSET", payload: data });
  },
});

export default connect(mapStateToProps, mapDispatchToProps)(CryptoDetails);
