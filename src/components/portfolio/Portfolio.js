import React from 'react';
import { connect } from "react-redux";
import { Link } from 'react-router-dom';
import { Table, Button } from 'antd';

const Portfolio = ({ datas }) => {

      const columns = [
        {
          title: 'Name',
          dataIndex: 'name',
          key: 'name',
        },
        {
          title: 'Symbol',
          dataIndex: 'symbol',
          key: 'symbol',
        },
        {
          title: 'Price',
          dataIndex: 'Price',
          key: 'Price',
        },
        {
          title: 'Total Supply',
          dataIndex: 'total_supply',
          key: 'total_supply',
        },
        {
          title: 'Market Cap',
          dataIndex: 'Market_Cap',
          key: 'Market_Cap',
        },
        {
          title: 'Action',
          key: 'key',
          render: (asset) => <Button style={{backgroundColor:'yellow', color:'black'}}><Link to={`/updateAsset/${asset.id}`} >Update</Link></Button>,
        }
      ]


    const dataSource = datas.map(({ ...item }) => ({
        ...item,
        key: item.id,
        Price: item.quote.USD.price,
        Market_Cap: item.quote.USD.market_cap
      }))

    return (
        <div>
            <h1>Portifolio</h1>
            <Button style={{backgroundColor:'green', color:'white', marginBottom:'20px'}}><Link to={`/addAsset`} >Add Asset</Link></Button>
            <Table dataSource={dataSource} columns={columns} />
        </div>
    )
}
const mapStateToProps = (state) => ({
    datas: state,
});

export default connect(mapStateToProps)(Portfolio);

