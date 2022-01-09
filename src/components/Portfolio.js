import React, { useState, useEffect } from "react";
import {
  Modal,
  Table,
  Button,
  InputNumber,
  Form,
  Row,
  Col,
  Typography,
} from "antd";
import { loadCryptos, selectAllCryptos } from "../slices/CryptosSlice";
import { useSelector, useDispatch } from "react-redux";
import { EditOutlined } from "@ant-design/icons";
import { Pie } from "@ant-design/plots";

const { Title } = Typography;

const Portfolio = () => {
  let portifolio = JSON.parse(localStorage.getItem("portifolio"));
  const [isModalVisible, setIsModalVisible] = useState(false);
  const [numberOfCoins, setNumberOfCoins] = useState(1);
  const [selectedCrypto, setSelectedCrypto] = useState(null);
  const [dataSource, setDataSource] = useState(portifolio);

  const dispatch = useDispatch();

  const columns = [
    {
      title: "Name",
      dataIndex: ["crypto", "name"],
      key: ["crypto", "name"],
    },
    {
      title: "Price/Coin",
      dataIndex: ["crypto", "quote", "USD", "price"],
      key: ["crypto", "quote", "USD", "price"],
      render: (text) => <p>${(text ? text.toLocaleString() : "0")}</p>,
      responsive: ["md"],
    },
    {
      title: "Coins",
      dataIndex: "coins",
      key: "coins",
    },
    {
      title: "Total Value",
      dataIndex: "total",
      key: "total",
      render: (text) => <p>${(text ? text.toLocaleString() : "0")}</p>,
      responsive: ["md"],
    },
    {
      title: "Profit/Loss(%)",
      dataIndex: "profit",
      key: "profit",
      render: (text) => (
        <>
          {text > 0 ? (
            <p style={{ color: "green" }}> {text}%</p>
          ) : (
            <p style={{ color: "red" }}> {text}%</p>
          )}
        </>
      ),
    },
    {
      title: "Action",
      key: "id",
      render: (text, record) => (
        <Button
          type="primary"
          ghost
          icon={<EditOutlined />}
          onClick={() => showModal(record)}
        >
          Update
        </Button>
      ),
    },
  ];

  useEffect(() => {
    dispatch(loadCryptos());
  }, [dispatch]);

  const showModal = (record) => {
    setIsModalVisible(true);
    setNumberOfCoins(record.coins);
    setSelectedCrypto(record);
  };

  const handleCancel = () => {
    setIsModalVisible(false);
  };

  const allCryptos = useSelector(selectAllCryptos);

  (dataSource || []).map((data) => {
    let currentCrypto = (allCryptos.cryptos || []).find(
      (crypto) => crypto.name === data.crypto.name
    );
    if (currentCrypto) {
      let sum = currentCrypto.quote.USD.price - data.crypto.quote.USD.price;
      data.profit = ((sum / currentCrypto.quote.USD.price) * 100).toFixed(3);
      data.total = currentCrypto.quote.USD.price * data.coins;
      console.log(data)
      return data
    } else {
      return data
    }
  });

  const onFinish = () => {
    const cryptoIndex = dataSource.findIndex(
      (data) => data.crypto.name === selectedCrypto.crypto.name
    );
    dataSource[cryptoIndex].coins = numberOfCoins;
    localStorage.setItem("portifolio", JSON.stringify(dataSource));
    setDataSource([...dataSource]);
    setIsModalVisible(false);
  };

  const onFinishFailed = (errorInfo) => {
    console.log("Failed:", errorInfo);
  };

  const data = (dataSource || []).map((crypto) => {
    return {
      type: crypto.crypto.name,
      value: crypto.total,
    };
  });

  const config = {
    appendPadding: 10,
    data,
    width: 250,
    height: 250,
    angleField: "value",
    colorField: "type",
    radius: 0.9,
    label: {
      type: "inner",
      offset: "-30%",
      content: ({ percent }) => `${(percent * 100).toFixed(0)}%`,
      style: {
        fontSize: 10,
        textAlign: "center",
      },
    },
    interactions: [
      {
        type: "element-active",
      },
    ],
  };

  return (
    <div>
      <Title level={3} style={{ margin: "10px 0 15px" }}>
        My Portifolio
      </Title>
      <Row align="top">
        <Col xs={24} sm={24} md={dataSource && dataSource.length > 0 ? 14 : 24}>
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
        </Col>
        {dataSource && dataSource.length > 0 ? (
          <Col xs={24} sm={24} md={8}>
            <Title level={5} type="primary" style={{ textAlign: "center" }}>
              Bitcoin vs Total Value(USD)
            </Title>
            <Pie {...config} />
          </Col>
        ) : (
          <Col
            xs={24}
            sm={24}
            md={8}
            style={{
              display: "flex",
              justifyContent: "center",
              alignItems: "center",
              flexDirection: "column",
              height: "150px",
            }}
          ></Col>
        )}
      </Row>

      <Modal
        title="Update Asset"
        visible={isModalVisible}
        onOk={onFinish}
        onCancel={handleCancel}
        footer={[
          <Button key="back" onClick={handleCancel}>
            Cancel
          </Button>,
          <Button key="Submit" type="primary" onClick={onFinish}>
            Update Asset
          </Button>,
        ]}
      >
        <Form
          name="update"
          onFinish={onFinish}
          onFinishFailed={onFinishFailed}
          autoComplete="off"
        >
          <label style={{ marginRight: "15px" }}>Number of coins:</label>
          <InputNumber
            min={1}
            value={numberOfCoins}
            onChange={(value) => setNumberOfCoins(value)}
          />
        </Form>
      </Modal>
    </div>
  );
};

export default Portfolio;
