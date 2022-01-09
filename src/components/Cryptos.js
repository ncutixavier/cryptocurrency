import React, { useEffect, useState } from "react";
import { loadCryptos, selectAllCryptos } from "../slices/CryptosSlice";
import { useSelector, useDispatch } from "react-redux";
import {
  Modal,
  Table,
  Button,
  InputNumber,
  Form,
  Select,
  Collapse,
  Typography
} from "antd";
import { HeartTwoTone } from "@ant-design/icons";

const { Panel } = Collapse;
const { Option } = Select;
const { Title } = Typography;

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

  const getAllCryptos = useSelector(selectAllCryptos);
  const [allCryptos, setAllCryptos] = useState(getAllCryptos);

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
      render: (text) => text.toLocaleString(),
    },
    {
      title: "Total Supply",
      dataIndex: "total_supply",
      key: "total_supply",
      responsive: ["md"],
      render: (text) => text.toLocaleString(),
    },
    {
      title: "Market Cap",
      dataIndex: ["quote", "USD", "market_cap"],
      key: ["quote", "USD", "market_cap"],
      responsive: ["md"],
      render: (text) => text.toLocaleString(),
    },
    {
      title: "Action",
      key: "id",
      render: (text, record) => (
        <>
          <Button type="primary" ghost onClick={() => showModal(record)}>
            More
          </Button>
        </>
      ),
    },
    {
      title: "Watch List",
      key: "watchlist",
      render: (text, record) => (
        <>
          {JSON.parse(localStorage.getItem("watchlist")) ? (
            JSON.parse(localStorage.getItem("watchlist")).find(
              (item) => item.crypto.name === record.name
            ) ? (
              <Button disabled
              icon={<HeartTwoTone twoToneColor="red" style={{ fontSize: "18px" }} />}
              key="watchlist"
            >
              Added to Watch List
            </Button>
              
            ) : (
              <Button
              icon={<HeartTwoTone style={{ fontSize: "18px" }} />}
              key="watchlist"
              onClick={() => handleAddToWatchList(record)}
            >
              Add to Watch List
            </Button>
            )
          ) : (
            <Button
              icon={<HeartTwoTone style={{ fontSize: "18px" }} />}
              key="watchlist"
              onClick={() => handleAddToWatchList(record)}
            >
              Add to Watch List
            </Button>
          )}
        </>
      ),
    },
  ];

  const handleAddToPortifolio = (details) => {
    console.log("Details::", details);
    setLoading(true);

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

  const handleAddToWatchList = (details) => {
    console.log("Details::", details);
    if (!localStorage.getItem("watchlist")) {
      let watchlist = [];
      watchlist.push({
        crypto: details,
        coins: numberOfCoins,
      });
      localStorage.setItem("watchlist", JSON.stringify(watchlist));
      
        setIsModalVisible(false);
    
    } else {
      const watchlist = JSON.parse(localStorage.getItem("watchlist"));
      const checkExist = watchlist.find(
        (item) => item.crypto.name === details.name
      );
      if (checkExist) {
        let findIndex = watchlist.findIndex(
          (item) => item.crypto.name === details.name
        );
        watchlist[findIndex].coins += numberOfCoins;
        localStorage.setItem("watchlist", JSON.stringify(watchlist));
      } else {
        watchlist.push({
          crypto: details,
          coins: numberOfCoins,
        });
        localStorage.setItem("watchlist", JSON.stringify(watchlist));
      }
      
        setIsModalVisible(false);
     
    }
  };

  const handleChange = (value, text) => {
    if (text.children === "USD") {
      setAllCryptos(getAllCryptos);
    } else {
      const data = allCryptos.cryptos.map((crypto) => {
        return {
          ...crypto,
          total_supply: crypto.total_supply * value,
          quote: {
            ...crypto.quote,
            USD: {
              ...crypto.quote.USD,
              price: crypto.quote.USD.price * value,
              market_cap: crypto.quote.USD.market_cap * value,
            },
          },
        };
      });
      setAllCryptos({ cryptos: data });
    }
  };

  return (
    <div>
      <div
        style={{
          display: "flex",
          justifyContent: "space-between",
          alignItems: "center",
          margin: "15px 0",
          width: "100%",
        }}
      >
        <Title level={4}>
          Latest cryptocurrencies
        </Title>
        <Select
          defaultValue="USD"
          style={{ width: 120 }}
          onChange={(value, text) => handleChange(value, text)}
        >
          <Option value="1">USD</Option>
          <Option value="0.89">EURO</Option>
          <Option value="1015">RWF</Option>
        </Select>
      </div>
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
