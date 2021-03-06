import React, { Component } from 'react'
import axios from "axios";
import {Button, makeStyles} from "@material-ui/core";
import styles from './warehoudeTable.css';
import SaleModal from "./SaleModal";
import WarehouseModal from "./WarehouseModal";

class Warehouses extends Component {

    state = {
        show: false,
        goods: [],
        id: -1,
        good_count: "",
        good_id: 0
    }

    showModal = (e, id, good_count, good_id) => {
        this.setState({
            show: !this.state.show,
            id: id,
            good_count: good_count,
            good_id: good_id
        });
    };

    componentDidMount() {
        axios.get('http://127.0.0.1:8080/warehouse' + this.props.warehouseNumber)
            .then(res => {
                const goods = res.data;
                this.setState({ goods: res.data });
            }).then((response) => console.log(response))
            console.log("error");
    }

    renderTableData() {
        return this.state.goods.map((good, index) => {
            const {good_id, name, priority, good_count } = good //destructuring
            return (
                <tr key={good_id}>
                    <td>{good_id}</td>
                    <td>{name}</td>
                    <td>{priority}</td>
                    <td>{good_count}</td>
                </tr>
            )
        })
    }

    tdclick(event){
        event.stopPropagation()
    };

    renderTableHeader() {
        let header = ["good_id", "name", "priority", "goodCount" ]
        return header.map((key, index) => {
            return <th key={index}>{key.toUpperCase()}</th>
        })
    }

    render() {
        return (
            <div>
                <h1 className='title'>Warehouse {this.props.warehouseNumber}</h1>
                {this.props.warehouseNumber == 1 ?
                    (<Button className='add-btn' onClick={e => {this.showModal(e, -1)}}>Add good</Button>) : null}
                <table className='warehouse1'>
                    <tbody>
                    <tr>{this.renderTableHeader()}</tr>
                    {this.renderTableData()}
                    </tbody>
                </table>
                {this.state.show && this.props.warehouseNumber == 1 ? (<WarehouseModal id = {this.state.id} good_count = {this.state.good_count} warehouseNumber = {this.props.warehouseNumber}
                                               good_id = {this.state.good_id} onClose={this.showModal} show={this.state.show} />) : null}
            </div>
        )
    }
}

export default Warehouses