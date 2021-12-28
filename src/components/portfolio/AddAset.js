import React, { useState } from 'react';
import { connect } from "react-redux";
import { useNavigate } from "react-router";
import { toast } from "react-toastify";
import './index.css';
import {Card} from 'antd';


const AddAsset = ({ datas, addAsset }) => {
    const [name, setName] = useState("");
    const [coins, setCoins] = useState("");
    const [price, setPrice] = useState("");

    const navigate = useNavigate();

    const handleSubmit = (e) => {
        e.preventDefault();
        const data = {
            id: datas.length > 0 ? datas[datas.length - 1].id + 1 : 0,
            name,
            coins,
            price,
        };

        addAsset(data);
        toast.success("Asset added successfully!!");
        navigate("/portifolio");
    };


    return (
        <div>
            <h1>Add Asset</h1>
            <Card style={{marginTop:'50px'}}>
            <form onSubmit={handleSubmit}>
            <div >
                    <input
                        type="text"
                        placeholder="name"
                        value={name}
                        onChange={(e) => setName(e.target.value)}
                    />
                </div>
                <div >
                    <input
                        type="number"
                        placeholder="number of coins"
                        value={coins}
                        onChange={(e) => setCoins(e.target.value)}
                    />
                </div>
                <div >
                    <input
                        type="number"
                        placeholder="price per coin"
                        value={price}
                        onChange={(e) => setPrice(e.target.value)}
                    />
                </div>
                <div >
                    <input
                        type="submit"
                        value="Add Asset"
                    />
                </div>
            </form>
            </Card>
        </div>
    )
}



const mapStateToProps = (state) => ({
    datas: state,
});
const mapDispatchToProps = (dispatch) => ({
    addAsset: (data) => {
        dispatch({ type: "ADD_ASSET", payload: data });
    },
});

export default connect(mapStateToProps, mapDispatchToProps)(AddAsset);
