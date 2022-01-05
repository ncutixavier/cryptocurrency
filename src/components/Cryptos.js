import React, { useEffect, useState } from "react";
import { loadCryptos, selectAllCryptos } from "../slices/CryptosSlice";
import { useSelector, useDispatch } from "react-redux";
import { Modal, Table, Button, InputNumber, Form } from "antd";
import { Collapse } from "antd";

const { Panel } = Collapse;

const Cryptocurrencies = () => {
  const [isModalVisible, setIsModalVisible] = useState(false);
  const [cryptoInfo, setCryptoInfo] = useState(null);
  const [infoToAdd, setInfoToAdd] = useState(null);
  const [loading, setLoading] = useState(false);
  const [numberOfCoins, setNumberOfCoins] = useState(1);
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(loadCryptos());
  }, [dispatch]);

  const allCryptos = useSelector(selectAllCryptos);

  const showModal = (record) => {
    console.log(record);
    const filteredRecord = [];
    filteredRecord.push(record);
    const arr = filteredRecord.map((record) => {
      return {
        Name: record.name,
        Symbol: record.symbol,
        Price: record.quote.USD.price,
        "Total Supply": record.total_supply,
        "Market Cap": record.quote.USD.market_cap,
        "Circulating Supply": record.circulating_supply,
        "24h Volume": record.quote.USD.volume_24h,
        "Last Updated": record.quote.USD.last_updated,
        "Price Rank": record.cmc_rank,
      };
    });
    console.log(arr);
    setCryptoInfo(arr[0]);
    setInfoToAdd(record);
    setIsModalVisible(true);
  };

  const handleOk = () => {
    setIsModalVisible(false);
  };

  const handleCancel = () => {
    setIsModalVisible(false);
  };

  const getNumberOfCoins = (value) => { 
    setNumberOfCoins(value);
    console.log("COIN::", value);
  };

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
      responsive: ["md"],
      render: (text) => (
        <p>${text.toLocaleString("en-US", { maximumFractionDigits: 2 })}</p>
      ),
    },
    {
      title: "Total Supply",
      dataIndex: "total_supply",
      key: "total_supply",
      responsive: ["md"],
      render: (text) => (
        <p>{text.toLocaleString("en-US", { maximumFractionDigits: 2 })}</p>
      ),
    },
    {
      title: "Market Cap",
      dataIndex: ["quote", "USD", "market_cap"],
      key: ["quote", "USD", "market_cap"],
      responsive: ["md"],
      render: (text) => (
        <p>${text.toLocaleString("en-US", { maximumFractionDigits: 2 })}</p>
      ),
    },
    {
      title: "Action",
      key: "id",
      render: (text, record) => (
        <Button type="primary" ghost onClick={() => showModal(record)}>
          More
        </Button>
      ),
    },
  ];

  const handleAddToPortifolio = (details) => {
    console.log("Details::", details);
    setLoading(true);
    // 1) STORE ASSET PRICE INFO

    if (!localStorage.getItem("portifolio")) {
      let portifolio = [];
      portifolio.push({
        crypto: details,
        coins: numberOfCoins,
      });
      localStorage.setItem("portifolio", JSON.stringify(portifolio));
      setTimeout(() => {
        setLoading(false);
        setIsModalVisible(false);
      }, 1000);
    } else {
      const portifolio = JSON.parse(localStorage.getItem("portifolio"));
      const checkExist = portifolio.find(
        (item) => item.crypto.name === details.name
      );
      if (checkExist) {
        let findIndex = portifolio.findIndex(
          (item) => item.crypto.name === details.name
        );
        portifolio[findIndex].coins += numberOfCoins;
        localStorage.setItem("portifolio", JSON.stringify(portifolio));
      } else {
        portifolio.push({
          crypto: details,
          coins: numberOfCoins,
        });
        localStorage.setItem("portifolio", JSON.stringify(portifolio));
      }

      setTimeout(() => {
        setLoading(false);
        setIsModalVisible(false);
      }, 1000);
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
        size="small"
      />
      {cryptoInfo ? (
        <Modal
          title={cryptoInfo.Name}
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
              onClick={() => handleAddToPortifolio(infoToAdd)}
            >
              Add to portifolio
            </Button>,
          ]}
        >
          <Collapse accordion>
            {Object.keys(cryptoInfo).map((key) => (
              <Panel header={key} key={key}>
                <p>{cryptoInfo[key]}</p>
              </Panel>
            ))}
          </Collapse>
          <Form.Item label="Number of coins" style={{ marginTop: "10px" }}>
            <InputNumber
              value={numberOfCoins}
              onChange={(value) => getNumberOfCoins(value)}
            />
          </Form.Item>
        </Modal>
      ) : (
        ""
      )}
    </div>
  );
};

export default Cryptocurrencies;
