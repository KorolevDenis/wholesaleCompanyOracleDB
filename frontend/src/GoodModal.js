import React from "react";
import ReactDom from 'react-dom'
import axios from "axios";
import {Button, Link} from "@material-ui/core";

export default class GoodModal extends React.Component {
    constructor(props) {
        super(props);
        this.state = {name: '', priority: '', isChanged: 0};

        if (this.props.id !== -1) {
            this.state.name =  this.props.name;
            this.state.priority = this.props.priority;
        }
    };

    onClose = e => {
        this.props.onClose && this.props.onClose(e);
    };

    handleChangeName = event => {
        this.setState({
            name: event.target.value
        });
    };

    handleChangePriority = event => {
        let telephone = event.target.value;

        if (!Number(telephone) && telephone !== '') {
            return;
        } else {
            if (telephone > 100) {
                return;
            }
        }

        this.setState({priority: telephone})
    };

    delete = () => {
        axios.delete('http://127.0.0.1:8080/delete-good?id=' + this.props.id)
            .catch(function (error) {
                alert(error.response.data);
                if (error.response) {
                    console.log(error.response.data)
                    alert(error.response.data);
                }
            });

        window.location.reload();
        this.onClose();
    };

    handleSubmit= () => {
        if (!this.state.name) {
            alert("Please enter name")
            return;
        }

        if (!this.state.priority) {
            alert("Please enter priority")
            return;
        }

        let payload = { id: this.props.id, name: this.state.name, priority: this.state.priority};
        axios.post('http://127.0.0.1:8080/add-good', payload)
            .catch(function (error) {
                if (error.response) {
                    console.log(error.response.data)
                    alert(error.response.data);

                }
            });

        window.location.reload();
        this.onClose();
    };

    render() {
        if (!this.props.show) {
            return null;
        }

        return ReactDom.createPortal(
            <div className='modal' id='modal' onClick={this.onClose}>
                <div className='modal-content' id='modal' onClick={e => e.stopPropagation()}>
                    <h4>{this.props.id === -1 ? "New good" : "Good with id " + this.props.id}</h4>
                    <div className='content'>
                            <label>Name </label><br/>
                            <input type="text" value={this.state.name} onChange={this.handleChangeName} /><br/>

                            <label>Priority </label><br/>
                            <input type="text" value={this.state.priority} onChange={this.handleChangePriority} /><br/>
                    </div>
                    <div className='.actions'>
                        <Button className=' add-btn btn' onClick={this.handleSubmit}>{this.props.id === -1 ? "Add" : "Edit"}</Button>
                        {this.props.id === -1 ? <label/> : ( <Button className=' delete-btn btn' onClick={this.delete}>Delete</Button>)}
                    </div>
                </div>
            </div>,
            document.getElementById('root')
        )
    };
};
