import React from "react";
import ReactDom from 'react-dom'
import styles from './Modal.css';
import axios from "axios";
import {Button} from "@material-ui/core";

export default class WarehouseModal extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            goodCount: '',
            createDate: '',
            goodId: -1,
            goodList: []
        }

        if (this.props.id !== -1) {
            this.state.goodCount =  this.props.goodCount;
            this.state.goodId = this.props.goodId;
        }
    };

    getGoods = () => {
        axios.get('http://127.0.0.1:8080/goods')
            .then(res => {
                this.setState({ goodList: res.data });
            }).catch(function (error) {
            if (error.response) {
                alert(error.response.data);

            }
        });
    };

    onClose = e => {
        this.props.onClose && this.props.onClose(e);
    };

    handleChangeGoodId = event => {
        this.setState({
            goodId: event.target.value
        });
    };

    handleChangeGoodCount = event => {
        let telephone = event.target.value;

        if (!Number(telephone) && telephone !== '') {
            return;
        }

        this.setState({goodCount: telephone})
    };

    delete = () => {
        axios.delete('http://127.0.0.1:8080/delete-warehouse'+this.props.warehouseNumber+ '?id=' + this.props.id)
            .catch(function (error) {
                alert(error.response.data);
                if (error.response) {
                    console.log(error.response.data)
                    alert(error.response.data);
                }
            })

        window.location.reload();
        this.onClose();
    };

    handleSubmit = event => {
        if (!this.state.goodCount) {
            alert("Please enter good count")
            return;
        }

        let payload = { id: this.props.id, goodId: this.state.goodId, name: '', priority: '', goodCount: this.state.goodCount};

        console.log(payload)
        axios.post('http://127.0.0.1:8080/add-warehouse' + this.props.warehouseNumber, payload)
            .catch(function (error) {
                if (error.response) {
                    console.log(error.response.data)
                    alert(error.response.data);

                }
            })


        window.location.reload();
        this.onClose();


        event.preventDefault();
    };

    renderSelect() {
        this.getGoods()
        return this.state.goodList.map((good, index) => {
            const { id, name, priority} = good
            return (
                <option value={id} >
                    {name}
                </option>
            )
        });
    };

    render() {
        if (!this.props.show) {
            return null;
        }

        return ReactDom.createPortal(
            <div className='modal' id='modal' onClick={this.onClose}>
                <div className='modal-content' id='modal' onClick={e => e.stopPropagation()}>
                    <h4>{this.props.id === -1 ? "New good in warehouse" + this.props.warehouseNumber : "Good in warehouse" + this.props.warehouseNumber + " with id " + this.props.id}</h4>
                    <div className='content'>
                        <label>Good count </label>
                        <input type="text" value={this.state.goodCount} onChange={this.handleChangeGoodCount} /><br/>
                        <label>Good </label>
                        <select defaultValue={this.state.goodId} value={this.state.goodId} onChange={this.handleChangeGoodId}>
                            {this.renderSelect()}
                        </select>
                    </div>
                    <div className='actions'>
                        <Button className='add-btn' onClick={this.handleSubmit}>{this.props.id === -1 ? "Add" : "Edit"}</Button>

                    </div>
                </div>
            </div>,
            document.getElementById('root')
        );
    };
};
