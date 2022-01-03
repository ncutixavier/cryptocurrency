import React, { useState } from "react";
import { Modal, Table, Button } from "antd";

const Portfolio = () => {
  const [isModalVisible, setIsModalVisible] = useState(false);
  const [loading, setLoading] = useState(false);
  
  const showModal = () => {
    setIsModalVisible(true);
  };

  const handleOk = () => {
    setTimeout(() => {
      setLoading(false);
      setIsModalVisible(false);
    }, 1000);
    setIsModalVisible(false);
  };

  const handleCancel = () => {
    setIsModalVisible(false);
  };

  const dataSource = JSON.parse(localStorage.getItem("portifolio"));
  console.log("dataSource::", dataSource);

  const columns = [
    {
      title: "Name",
      dataIndex: "name",
      key: "name",
    },
    {
      title: "Symbol",
      dataIndex: "symbol",
      key: "symbol",
    },
    {
      title: "Price",
      dataIndex: ["quote", "USD", "price"],
      key: ["quote", "USD", "price"],
    },
    {
      title: "Total Supply",
      dataIndex: "total_supply",
      key: "total_supply",
      responsive: ["md"],
    },
    {
      title: "Market Cap",
      dataIndex: ["quote", "USD", "market_cap"],
      key: ["quote", "USD", "market_cap"],
      responsive: ["md"],
    },
    {
      title: "Action",
      key: "id",
      render: (text, record) => (
        <Button type="primary" ghost onClick={() => getCryptoDetails(record)}>
          View
        </Button>
      ),
    },
  ];

  const getCryptoDetails = (details) => {
    console.log("Details::", details);
  };

  return (
    <div>
      <div
        style={{
          display: "flex",
          justifyContent: "space-between",
          alignItems: "center",
          margin: "15px 0",
        }}
      >
        <h1>My Portifolio</h1>
        <Button type="primary" ghost onClick={showModal}>
          Add New Asset
        </Button>
      </div>
      <Table
        columns={columns}
        dataSource={dataSource}
        rowKey={(record) => record.id}
        bordered
        size="small"
      />
      <Modal
        title="Add New Asset"
        visible={isModalVisible}
        onOk={handleOk}
        onCancel={handleCancel}
        footer={[
          <Button key="back" onClick={handleCancel}>
            Cancel
          </Button>,
          <Button
            key="Submit"
            loading={loading}
            type="primary"
            onClick={handleOk}
          >
            Add Asset
          </Button>,
        ]}
      >
        <p>Some contents...</p>
        <p>Some contents...</p>
        <p>Some contents...</p>
      </Modal>
    </div>
  );
};

export default Portfolio;
