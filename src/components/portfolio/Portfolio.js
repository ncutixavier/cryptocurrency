import React from 'react';
import { connect } from "react-redux";
import { Link } from 'react-router-dom';

const Portfolio = ({ datas }) => {

    let assets = datas.map((asset, id) => {
        return <ul key={id}>
            <li>{asset.name}</li>
            <Link to={`/updateAsset/${asset.id}`}>update</Link>
        </ul>
    })
    return (
        <div>
            <h1>Portifolio</h1>
            <Link to="/addAsset">Add Asset</Link>
            {assets}
        </div>
    )
}
const mapStateToProps = (state) => ({
    datas: state,
});

export default connect(mapStateToProps)(Portfolio);

