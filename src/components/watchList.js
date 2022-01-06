import React from 'react'
import { Table } from "antd";
import { selectAllCryptos } from "../slices/CryptosSlice";
import { useSelector } from "react-redux";

const WatchList = () => {

    let dataSource = JSON.parse(localStorage.getItem("watchlist"));
    console.log(dataSource)

    const allCryptos = useSelector(selectAllCryptos);

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
        }
    ];


    return (
        <div>
            <h1>Watch List</h1>

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
        </div>
    )
}

export default WatchList
