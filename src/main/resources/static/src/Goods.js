import React, { Component } from 'react'
import axios from "axios";
import styles from './warehoudeTable.css';
import GoodModal from "./GoodModal";
import {Button, Link} from "@material-ui/core";
import {Route, BrowserRouter, Redirect} from 'react-router-dom'
import Demand from "./Demand";

class Goods extends Component {

    state = {
        show: false,
        show_demand: false,
        goods: [],
        most_goods: [],
        id: -1,
        id_demand: -1,
        good_name: "",
        good_priority: ""
    };

    showModal = (e, id, name, priority) => {
        this.setState({
            show: !this.state.show,
            id: id,
            good_name: name,
            good_priority: priority
        });
    };

    componentDidMount() {
        axios.get('http://127.0.0.1:8080/goods')
            .then(res => {
                this.setState({ goods: res.data });
            }).catch(function (error) {
            if (error.response) {
                alert(error.response.data);
            }
        })

        axios.get('http://127.0.0.1:8080/goods-five-popular')
            .then(res => {
                this.setState({ most_goods: res.data });
            }).catch(function (error) {
            if (error.response) {
                alert(error.response.data);
            }
        })
    }

    tdclick(event){
        event.stopPropagation()
    };

    showDemand = (event, id) => {
        event.stopPropagation()
        this.changeDemandState(id)
    }

    changeDemandState = (id) => {
        this.setState({
            show_demand: !this.state.show_demand,
            id_demand: id
        });
    }

    renderTableDataMost(list) {
        return list.map((good, index) => {
            const { id, name, priority} = good //destructuring
            return (
                <tr key={id} onClick={e => {
                    this.showModal(e, id, name, priority);
                }}>
                    <td >{id}</td>
                    <td >{name}</td>
                    <td>{priority}</td>
                </tr>
            )
        })
    }

    renderTableData(list) {
        return list.map((good, index) => {
            const { id, name, priority} = good //destructuring
            return (
                <tr key={id} onClick={e => {
                    this.showModal(e, id, name, priority);
                }}>
                    <td >{id}</td>
                    <td >{name}</td>
                    <td>{priority}</td>
                    <td>
                        <Button className='' onClick={e => {this.showDemand(e, id)}}>Demand</Button>
                    </td>
                </tr>
            )
        })
    }

    renderTableHeaderMost() {
        let header = ["id", "name", "priority"]
        return header.map((key, index) => {
            return <th key={index}>{key.toUpperCase()}</th>
        })
    }

    renderTableHeader() {
        let header = ["id", "name", "priority", ""]
        return header.map((key, index) => {
            return <th key={index}>{key.toUpperCase()}</th>
        })
    }

    render() {
        return (
            <div>

                <h1 className='title'>Goods</h1>
                <h4 className='title-most-popular'>Five the most important goods</h4>

                <table className='warehouse1 most-popular-table'>
                    <tbody>
                    <tr>{this.renderTableHeaderMost()}</tr>
                    {this.renderTableDataMost(this.state.most_goods)}
                    </tbody>
                </table>

                <Button className='btn add-btn' onClick={e => {this.showModal(e, -1)}}>Add Good</Button>
                <table className='warehouse1' id="main-table">
                    <tbody>
                    <tr>{this.renderTableHeader()}</tr>
                    {this.renderTableData(this.state.goods)}
                    </tbody>
                </table>
                {this.state.show ? (<GoodModal id = {this.state.id} name = {this.state.good_name} priority = {this.state.good_priority}
                                               onClose={this.showModal} show={this.state.show} />) : null}
                {this.state.show_demand ? (<Demand id = {this.state.id_demand}
                                               onClose={this.changeDemandState} show={this.state.show_demand} />) : null}

            </div>
        )
    }
}

export default Goods