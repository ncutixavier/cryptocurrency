import React, { useEffect } from 'react';
import { loadCryptos, selectAllCryptos } from '../slices/CryptosSlice';
import { useSelector, useDispatch } from 'react-redux';
import { Table, Button } from 'antd';


const Cryptocurrencies = () => {
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(loadCryptos());
  }, [dispatch]);

  const allCryptos = useSelector(selectAllCryptos);

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
      dataIndex: ['quote', 'USD', 'price'],
      key: ['quote', 'USD', 'price'],
    },
    {
      title: 'Total Supply',
      dataIndex: 'total_supply',
      key: 'total_supply',
    },
    {
      title: 'Market Cap',
      dataIndex: ['quote', 'USD', 'market_cap'],
      key: ['quote', 'USD', 'market_cap'],
    },
    {
      title: 'Action',
      key: 'id',
      render: (text, record) => (
        <Button type='primary' ghost onClick={() => getCryptoDetails(record)}>
          Add to Portifolio
        </Button>
      ),
    },
  ];


 const getCryptoDetails = (details) => {
   console.log('Details::', details);
   if (!localStorage.getItem('portifolio')) {
     let portifolio = [];
     portifolio.push(details);
     localStorage.setItem('portifolio', JSON.stringify(portifolio));
   } else {
     const portifolio = JSON.parse(localStorage.getItem('portifolio'));
     portifolio.push(details);
     localStorage.setItem('portifolio', JSON.stringify(portifolio));
   }
 };

  return (
    <div>
      <h1>Latest cryptocurrencies</h1>
      <Table
        loading={allCryptos.loading}
        columns={columns}
        dataSource={allCryptos.cryptos}
        rowKey={(record) => record.id}
        bordered
        size='small'
      />
    </div>
  );
};

export default Cryptocurrencies;
