import React from 'react'
import { Table, Button } from 'antd';

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
        View details
      </Button>
    ),
  },
];

const getCryptoDetails = (details) => { 
    console.log('Details::', details);
}

const Portfolio = () => {
    const dataSource = JSON.parse(localStorage.getItem('portifolio'));
    console.log('dataSource::', dataSource);
    return (
      <div>
        <h1>My Portifolio</h1>
        <Table
          columns={columns}
          dataSource={dataSource}
          rowKey={(record) => record.id}
          bordered
          size='small'
        />
      </div>
    );
}

export default Portfolio
