import React, { useState, useEffect } from 'react';
import axios from "axios";
import { Link } from 'react-router-dom';
import { Table, Button } from 'antd';


const Cryptocurrencies = () => {

  const [cryptocurrencies, setCryptocurrencies] = useState([]);
  const [loading, setLoading] = useState(false)


  const retriveCryptocurrencies = async () => {
    setLoading(true)
    const response = await axios.get(process.env.REACT_APP_SECRET_NAME)
    setLoading(false)
    return response.data.data;
  };

  useEffect(() => {
    
    const getAllCryptocurrencies = async () => {
      const allCryptocurrencies = await retriveCryptocurrencies()
      if (allCryptocurrencies) setCryptocurrencies(allCryptocurrencies)
    };
    getAllCryptocurrencies();
    
  }, []);

  const dataSource = cryptocurrencies.map(({ ...item }) => ({
    ...item,
    key: item.id,
    Price: item.quote.USD.price,
    Market_Cap: item.quote.USD.market_cap
  }))

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
      render: (text) => <Button style={{backgroundColor:'green', color:'white'}}><Link to={`/cryptoDetails/${text.id}`} state={{ from: text }}>More</Link></Button>,
    }
  ]


  return (
    <div>
      <h1>Latest cryptocurrencies</h1>
      <Table dataSource={dataSource} columns={columns} loading={loading} />
    </div>
  );
};


export default (Cryptocurrencies);