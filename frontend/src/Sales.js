import React, { Component } from 'react'
import axios from "axios";
import styles from './warehoudeTable.css';
import SaleModal from "./SaleModal";
import {Button} from "@material-ui/core";

class Sales extends Component {
    state = {
        show: false,
        goods: [],
        id: -1,
        goodCount: "",
        createDate: "",
        goodId: 0
    }

    showModal = (e, id, goodCount, createDate, goodId) => {
        this.setState({
            show: !this.state.show,
            id: id,
            goodCount: goodCount,
            createDate: createDate,
            goodId: goodId
        });
    };

    componentDidMount() {
        axios.get('http://127.0.0.1:8080/sales')
            .then(res => {
                const goods = res.data;
                this.setState({ goods: res.data });
            }).catch(function (error) {
            if (error.response) {
                alert(error.response.data);

            }
        });
    };

    tdclick(event){
        event.stopPropagation()
    };

    renderTableData() {
        return this.state.goods.map((good, index) => {
            const { id, goodCount, createDate, goodId, name, priority} = good //destructuring
            return (
                <tr key={id} onClick={e => {
                    this.showModal(e, id, goodCount, createDate, goodId);
                }}>
                    <td>{id}</td>
                    <td>{goodCount}</td>
                    <td>{this.convertDate(createDate)}</td>
                    <td>{goodId}</td>
                    <td>{name}</td>
                    <td onClick={this.tdclick}>{priority}</td>
                </tr>
            )
        });
    };

    convertDate(inputFormat) {
        function pad(s) { return (s < 10) ? '0' + s : s; }
        const d = new Date(inputFormat);
        return [pad(d.getDate()), pad(d.getMonth()+1), d.getFullYear()].join('-')
    };

    renderTableHeader() {
        let header = ["id", "goodCount", "createDate", "goodId", "name", "priority"]
        return header.map((key, index) => {
            return <th key={index}>{key.toUpperCase()}</th>
        });
    };

    render() {
        return (
            <div>
                <h1 className='title'>Sales</h1>
                <Button className='delete-btn' onClick={e => {this.showModal(e, -1)}}>Add sale</Button>
                <table className='warehouse1'>
                    <tbody>
                    <tr>{this.renderTableHeader()}</tr>
                    {this.renderTableData()}
                    </tbody>
                </table>
                {this.state.show ? (<SaleModal id = {this.state.id} goodCount = {this.state.goodCount} createDate = {this.state.createDate}
                                               goodId = {this.state.goodId} onClose={this.showModal} show={this.state.show} />) : null}
            </div>
        )
    };
}

export default Sales