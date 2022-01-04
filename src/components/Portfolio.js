import React, { useState, useEffect } from "react";
import { Modal, Table, Button } from "antd";
import { loadCryptos, selectAllCryptos } from "../slices/CryptosSlice";
import { useSelector, useDispatch } from "react-redux";

const Portfolio = () => {
  const [isModalVisible, setIsModalVisible] = useState(false);
  const [loading, setLoading] = useState(false);
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(loadCryptos());
  }, [dispatch]);

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

  let dataSource = JSON.parse(localStorage.getItem("portifolio"));
  console.log("dataSource::", dataSource);

  const columns = [
    {
      title: "Name",
      dataIndex: ["crypto", "name"],
      key: ["crypto", "name"],
    },
    {
      title: "Symbol",
      dataIndex: ["crypto", "symbol"],
      key: ["crypto", "symbol"],
    },
    {
      title: "Price per coin",
      dataIndex: ["crypto", "quote", "USD", "price"],
      key: ["crypto", "quote", "USD", "price"],
    },
    {
      title: "Coins",
      dataIndex: "coins",
      key: "coins",
    },
    {
      title: "Profit/Loss(%)",
      dataIndex: "profit",
      key: "profit",
    },
    // {
    //   title: "Action",
    //   key: "id",
    //   render: (text, record) => (
    //     <Button type="primary" ghost onClick={() => getCryptoDetails(record)}>
    //       View
    //     </Button>
    //   ),
    // },
  ];

  const allCryptos = useSelector(selectAllCryptos);
  console.log("CRYPTO::", allCryptos);

  // const getCryptoDetails = (details) => {
  //   console.log("Details::", details);
  // };

  (dataSource || []).map((data) => {
    let currentCrypto = (allCryptos.cryptos || []).find(
      (crypto) => crypto.name === data.crypto.name
    );
    if (currentCrypto) {
      let sum = currentCrypto.quote.USD.price - data.crypto.quote.USD.price;
      data.profit = (sum / 100).toFixed(3);
    }
  });

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
        loading={allCryptos.loading}
        columns={columns}
        dataSource={dataSource ? dataSource : []}
        rowKey={(record) => {
          if (record) {
            return record.crypto.id;
          }
        }}
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
        <p>//Add form with two fields</p>
      </Modal>
    </div>
  );
};

export default Portfolio;
