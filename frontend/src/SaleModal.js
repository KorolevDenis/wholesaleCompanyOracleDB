import React from "react";
import ReactDom from 'react-dom'
import styles from './Modal.css';
import axios from "axios";
import {Button} from "@material-ui/core";

export default class GoodModal extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            goodCount: '',
            createDate: '',
            goodId: -1,
            goodList: []
        }

        const curr = new Date();
        curr.setDate(curr.getDate());

        if (this.props.id !== -1) {
            this.state.goodCount =  this.props.goodCount;
            this.state.createDate = this.props.createDate
            this.state.goodId = this.props.goodId;
        } else {
            this.state.createDate = curr.toISOString().substr(0,10);
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

    handleChangeGoodCount = event => {
        let telephone = event.target.value;

        if (!Number(telephone) && telephone !== '') {
            return;
        }

        this.setState({goodCount: telephone})
    };

    handleChangeGoodId = event => {
        this.setState({
            goodId: event.target.value
        });
    };

    handleChangeCreateDate = event => {
        let telephone = event.target.value;
        this.setState({createDate: telephone})
    };

    delete = () => {
        axios.delete('http://127.0.0.1:8080/delete-sale?id=' + this.props.id)
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

    convertDate(inputFormat) {
        function pad(s) { return (s < 10) ? '0' + s : s; }
        const d = new Date(inputFormat);
        return [pad(d.getDate()), pad(d.getMonth()+1), d.getFullYear()].join('-')
    };

    handleSubmit = event => {
        if (!this.state.goodCount) {
            alert("Please enter good count")
            return;
        }

        if (!this.state.createDate) {
            alert("Please enter create date")
            return;
        }

        alert("Количество товаров в заявке больше на количество товаров на обоих складах")

        let payload = { id: this.props.id, goodCount: this.state.goodCount, createDate: this.convertDate(this.state.createDate),
            goodId: this.state.goodId, name: '', priority: ''};

        axios.post('http://127.0.0.1:8080/add-sale', payload)
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
                    <h4>{this.props.id === -1 ? "New sale" : "Sale with id " + this.props.id}</h4>
                    <div className='content'>
                        <label>Good count </label>
                        <input type="text" value={this.state.goodCount} onChange={this.handleChangeGoodCount} /><br/>

                        <label>Create date </label>
                        <input type="date" value={this.state.createDate} onChange={this.handleChangeCreateDate} /><br/>
                        <label>Good </label>
                        <select defaultValue={this.state.goodId} value={this.state.goodId} onChange={this.handleChangeGoodId}>
                            {this.renderSelect()}
                        </select>
                    </div>
                    <div className='actions'>
                        <Button className='add-btn btn' onClick={this.handleSubmit}>{this.props.id === -1 ? "Add" : "Edit"}</Button>
                        {this.props.id === -1 ? <label/> : ( <Button className=' delete-btn btn' onClick={this.delete}>Delete</Button>)}

                    </div>
                </div>
            </div>,
            document.getElementById('root')
        );
    };
};
