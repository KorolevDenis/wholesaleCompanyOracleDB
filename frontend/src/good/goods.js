import React, {Component, useEffect, useState} from 'react'
import axios from "axios";
import GoodModal from "../modal/goodModal";
import {Button} from "@material-ui/core";
import Demand from "../modal/demand";
import './goods.css';

export default function Goods(props) {
    const [isShown, setIsShown] = useState(false);
    const [isShownDemand, setIsShownDemand] = useState(false);
    const [goods, setGoods] = useState([]);
    const [mostGoods, setMostGoods] = useState([]);
    const [id, setId] = useState(-1);
    const [idDemand, setIdDemand] = useState(-1);
    const [goodName, setGoodName] = useState("");
    const [goodPriority, setGoodPriority] = useState("");

    const showModal = (e, id, name, priority) => {
        setIsShown(!isShown);
        setId(id);
        setGoodName(name);
        setGoodPriority(priority)
    };

    useEffect(() => {
        axios.get('http://127.0.0.1:8080/goods')
            .then(res => {
                setGoods(res.data);
            }).catch(function (error) {
            if (error.response) {
                alert(error.response.data);
            }
        })
        axios.get('http://127.0.0.1:8080/goods-five-popular')
            .then(res => {
                setMostGoods(res.data);
            }).catch(function (error) {
            if (error.response) {
                alert(error.response.data);
            }
        });
    });

    const showDemand = (event, id) => {
        event.stopPropagation()
        changeDemandState(id)
    };

    const changeDemandState = (id) => {
        setIsShownDemand(!isShownDemand)
        setIdDemand(id)
    };

    const renderTableDataMost = list => {
        return list.map((good, index) => {
            const {id, name, priority} = good //destructuring
            return (
                <tr key={id} onClick={e => {
                    showModal(e, id, name, priority);
                }}>
                    <td>{id}</td>
                    <td>{name}</td>
                    <td>{priority}</td>
                </tr>
            )
        });
    };

    const renderTableData = list => {
        return list.map((good, index) => {
            const {id, name, priority} = good //destructuring
            return (
                <tr key={id} onClick={e => {
                    showModal(e, id, name, priority);
                }}>
                    <td>{id}</td>
                    <td>{name}</td>
                    <td>{priority}</td>
                    <td>
                        <Button className='' onClick={e => {
                            showDemand(e, id)
                        }}>Demand</Button>
                    </td>
                </tr>
            )
        });
    };

    const renderTableHeaderMost = () => {
        let header = ["id", "name", "priority"]
        return header.map((key, index) => {
            return <th key={index}>{key.toUpperCase()}</th>
        })
    };

    const renderTableHeader = () => {
        let header = ["id", "name", "priority", ""]
        return header.map((key, index) => {
            return <th key={index}>{key.toUpperCase()}</th>
        })
    };

    return (
        <div>

            <h1 className='title'>Goods</h1>
            <h4 className='title-most-popular'>Five the most important goods</h4>

            <table className='good-table most-popular-table'>
                <tbody>
                <tr>{renderTableHeaderMost()}</tr>
                {renderTableDataMost(mostGoods)}
                </tbody>
            </table>

            <Button className='add-btn' onClick={e => {
                showModal(e, -1)
            }}>Add Good</Button>
            <table className='good-table'>
                <tbody>
                <tr>{renderTableHeader()}</tr>
                {renderTableData(goods)}
                </tbody>
            </table>
            {isShown ? (
                <GoodModal id={id} name={goodName} priority={goodPriority}
                           onClose={showModal} show={isShown}/>) : null}
            {showDemand ? (<Demand id={idDemand} onClose={changeDemandState} show={showDemand}/>) : null}

        </div>
    )
};
