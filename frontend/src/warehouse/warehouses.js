import React, { Component } from 'react'
import axios from "axios";
import {Button} from "@material-ui/core";
import './warehouses.css';
import WarehouseModal from "../modal/warehouseModal";

class Warehouses extends Component {
    state = {
        show: false,
        goods: [],
        id: -1,
        goodCount: "",
        goodId: 0
    }

    showModal = (e, id, goodCount, goodId) => {
        this.setState({
            show: !this.state.show,
            id: id,
            goodCount: goodCount,
            goodId: goodId
        });
    };

    componentDidMount() {
        axios.get('http://127.0.0.1:8080/warehouse' + this.props.warehouseNumber)
            .then(res => {
                const goods = res.data;
                this.setState({ goods: res.data });
            }).then((response) => console.log(response))
            console.log("error");
    };

    renderTableData() {
        return this.state.goods.map((good, index) => {
            const {goodId, name, priority, goodCount } = good //destructuring
            return (
                <tr key={goodId}>
                    <td>{goodId}</td>
                    <td>{name}</td>
                    <td>{priority}</td>
                    <td>{goodCount}</td>
                </tr>
            )
        });
    };

    renderTableHeader() {
        let header = ["goodId", "name", "priority", "goodCount" ]
        return header.map((key, index) => {
            return <th key={index}>{key.toUpperCase()}</th>
        })
    };

    render() {
        return (
            <div>
                <h1 className='title'>Warehouse {this.props.warehouseNumber}</h1>
                {this.props.warehouseNumber === 1 ?
                    (<Button className='add-btn' onClick={e => {this.showModal(e, -1)}}>Add good</Button>) : null}
                <table className='warehouse-table'>
                    <tbody>
                    <tr>{this.renderTableHeader()}</tr>
                    {this.renderTableData()}
                    </tbody>
                </table>
                {this.state.show && this.props.warehouseNumber === 1 ? (<WarehouseModal id = {this.state.id} goodCount = {this.state.goodCount} warehouseNumber = {this.props.warehouseNumber}
                                                                                        goodId = {this.state.goodId} onClose={this.showModal} show={this.state.show} />) : null}
            </div>
        )
    };
};

export default Warehouses