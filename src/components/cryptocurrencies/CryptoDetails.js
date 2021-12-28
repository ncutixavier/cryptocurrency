import { toast } from "react-toastify";
import React, { useState } from 'react';
import { connect } from "react-redux";
import { useLocation } from "react-router-dom";
import { Button, Card, Row, Col } from 'antd';


const CryptoDetails = ({ datas, addAsset }) => {

  const [assets, setAssets] = useState(datas)

  const location = useLocation();
  console.log(assets)

  const { from } = location.state;
  console.log(from)

  return (
    <div style={{ display: 'flex', justifyContent: 'center', marginTop: "120px" }} className="site-card-border-less-wrapper">
      <Card title={from.name} bordered={false} style={{ width: 700 }}>
        <Row>
          <Col span={12}><b>Symbol:</b> {from.symbol}</Col>
          <Col span={12}><b>Price:</b> {from.quote.USD.price}</Col>
        </Row>
        <Row>
          <Col span={12}><b>Circulating Supply:</b> {from.circulating_supply}</Col>
          <Col span={12}><b>24 Hour Volume:</b> {from.quote.USD.volume_24h}</Col>
          
        </Row>
        <Row>

        <Col span={12}><b>Total Supply:</b> {from.total_supply}</Col>
          <Col span={12}><b>Market Cap:</b> {from.quote.USD.market_cap}</Col>
        </Row>
        <Row>
        <Col span={12}><b>Last Updated:</b> {from.last_updated}</Col>
          <Col span={12}><b>Price Rank:</b> {from.cmc_rank}</Col>
        </Row>
        <Button style={{ backgroundColor: 'green', color: 'white', marginTop:'50px' }} type="primary"><a onClick={() => { addAsset(from); toast.success("Asset added successfully!!") }}>Add to Portfolio</a></Button>
      </Card>
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
