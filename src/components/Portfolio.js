import React, { useState, useEffect } from "react";
import { Modal, Table, Button, InputNumber, Form } from "antd";
import { loadCryptos, selectAllCryptos } from "../slices/CryptosSlice";
import { useSelector, useDispatch } from "react-redux";
import { EditOutlined } from "@ant-design/icons";

const Portfolio = () => {
  const [isModalVisible, setIsModalVisible] = useState(false);
  const [numberOfCoins, setNumberOfCoins] = useState(1);
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(loadCryptos());
  }, [dispatch]);

  const showModal = (record) => {
    if (record) {
      setIsModalVisible(true);
      setNumberOfCoins(record.coins);
      console.log(record.coins);
    }
  };

  const handleCancel = () => {
    setIsModalVisible(false);
  };

  let dataSource = JSON.parse(localStorage.getItem("portifolio"));

  const columns = [
    {
      title: "Name",
      dataIndex: ["crypto", "name"],
      key: ["crypto", "name"],
    },
    // {
    //   title: "Symbol",
    //   dataIndex: ["crypto", "symbol"],
    //   key: ["crypto", "symbol"],
    // },
    {
      title: "Price per coin(USD)",
      dataIndex: ["crypto", "quote", "USD", "price"],
      key: ["crypto", "quote", "USD", "price"],
      render: (text) => (
        <p>${text.toLocaleString("en-US", { maximumFractionDigits: 2 })}</p>
      ),
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

  const allCryptos = useSelector(selectAllCryptos);

  (dataSource || []).map((data) => {
    let currentCrypto = (allCryptos.cryptos || []).find(
      (crypto) => crypto.name === data.crypto.name
    );
    if (currentCrypto) {
      let sum = currentCrypto.quote.USD.price - data.crypto.quote.USD.price;
      data.profit = ((sum / currentCrypto.quote.USD.price) * 100).toFixed(3);
    }
    return data;
  });

  const onFinish = (values) => {
    console.log("Success:", values);
  };

  const onFinishFailed = (errorInfo) => {
    console.log("Failed:", errorInfo);
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
        title="Update Asset"
        visible={isModalVisible}
        onOk={onFinish}
        onCancel={handleCancel}
        footer={[
          <Button key="back" onClick={handleCancel}>
            Cancel
          </Button>,
          <Button
            key="Submit"
            type="primary"
            onClick={onFinish}
          >
            Update Asset
          </Button>,
        ]}
      >
        <Form
          name="basic"
          labelCol={{
            span: 8,
          }}
          wrapperCol={{
            span: 16,
          }}
          onFinish={onFinish}
          onFinishFailed={onFinishFailed}
          autoComplete="off"
        >
          <Form.Item
            label="Coins"
            initialValue={numberOfCoins}
            name="coins"
            rules={[
              {
                required: true,
                message: "Please input number of conis!",
              },
            ]}
          >
            <InputNumber />
          </Form.Item>

          {/* <Form.Item label="Price Per Coin" name="price">
            <InputNumber />
          </Form.Item> */}
        </Form>
      </Modal>
    </div>
  );
};

export default Portfolio;
