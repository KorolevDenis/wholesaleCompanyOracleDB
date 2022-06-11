import React, { Component } from 'react'
import axios from "axios";
import {Button} from "@material-ui/core";
import ReactDom from "react-dom";
import ReactApexChart from "react-apexcharts";

class Child extends React.Component {
    constructor(props) {
        super(props);

        this.state = {
            series: [{
                name: "Good count",
                data: this.props.goodCounts
            }],
            options: {
                chart: {
                    height: 350,
                    type: 'line',
                    zoom: {
                        enabled: false
                    }
                },
                dataLabels: {
                    enabled: false
                },
                stroke: {
                    curve: 'straight'
                },
                title: {
                    text: 'Good demand trends',
                    align: 'left'
                },
                grid: {
                    row: {
                        colors: ['#f3f3f3', 'transparent'],
                        opacity: 0.5
                    },
                },
                xaxis: {
                    categories: this.props.dates,
                }
            },
        };
    }

    convertDate(inputFormat) {
        function pad(s) { return (s < 10) ? '0' + s : s; }
        const d = new Date(inputFormat);
        return [pad(d.getDate()), pad(d.getMonth()+1), d.getFullYear()].join('-')
    }

    renderTableData(list) {
        return list.map((demand) => {
            const { date, good_count} = demand
            return (
                <tr key={date}>
                    <td>{this.convertDate(date)}</td>
                    <td>{good_count}</td>
                </tr>
            )
        })
    }

    renderTableHeader() {
        let header = ["date", "good_count"]
        return header.map((key, index) => {
            return <th key={index}>{key.toUpperCase()}</th>
        })
    }

    render() {
        const goodCounts = [];
        const dates = [];

        this.props.demands.map((good) => {
                const {date, goodCount} = good;
                goodCounts.push(goodCount);
                dates.push(date);
            }
        )

        return (
            <div>
                <div id="chart">
                    <ReactApexChart id = "demand-chart" options={this.state.options} series={this.state.series} type="line" height={350}/>
                </div>

                <table className='warehouse1'>
                <tbody>
                <tr>{this.renderTableHeader()}</tr>
                {this.renderTableData(this.props.demands)}
                </tbody>
            </table>
            </div>

        );
    }
}

class Demand extends Component {
    constructor(props) {
        super(props);
        this.state = {
            demands: [],
            default_date: new Date(),
            lhs_date: new Date(),
            rhs_date: new Date(),
            good_count: [],
            dates: []
        };

        const curr = new Date();
        curr.setDate(curr.getDate() - 1);
        this.state.lhs_date = curr.toISOString().substr(0,10);

        curr.setDate(curr.getDate() + 2);
        this.state.rhs_date = curr.toISOString().substr(0,10);
    }

    convertDate(inputFormat) {
        function pad(s) { return (s < 10) ? '0' + s : s; }
        const d = new Date(inputFormat);
        return [pad(d.getDate()), pad(d.getMonth()+1), d.getFullYear()].join('-')
    }

    onClose = e => {
        this.props.onClose && this.props.onClose(e);
    };

    handleSubmit = event => {
        if (this.state.lhs_date === "" || this.state.rhs_date === "") {
            alert("First date should be less then second")
        } else if (this.state.lhs_date > this.state.rhs_date) {
            alert("First date should be less then second")
        } else {
            axios.get('http://127.0.0.1:8080/goods-demand?id=' + this.props.id + '&lhs=' +
                this.convertDate(this.state.lhs_date)
                + '&rhs=' + this.convertDate(this.state.rhs_date))
                .then(res => {
                    this.setState({demands: res.data});
                }).catch(function (error) {
                if (error.response) {
                    alert(error.response.data);
                }
            })
        }

        const goodCounts = [];
        const dates = [];

        this.state.demands.map((good, iter) => {
                const {date, good_count} = good;
                goodCounts.push(good_count);
                dates.push(date);
            }
        )

        this.state.good_count = goodCounts
        this.state.dates = dates
    }

    handleChangeLhsDate = event => {
        this.setState({
            lhs_date: event.target.value
        });
    }

    handleChangeRhsDate = event => {
        this.setState({
            rhs_date: event.target.value
        });
    }

    render() {
        if (!this.props.show) {
            return null;
        }

        return ReactDom.createPortal(
            <div className='modal demand-modal' id='modal' onClick={this.onClose}>
                <div className='modal-content demand-modal-content' id='modal' onClick={e => e.stopPropagation()}>
                    <h4>Change in demand for good with id {this.props.id}</h4>
                    <div className='demand-content'>
                        <label>First date </label>
                        <input  type="date" value={this.state.lhs_date} onChange={this.handleChangeLhsDate} /><br/>

                        <label>Second date </label>
                        <input type="date" value={this.state.rhs_date} onChange={this.handleChangeRhsDate} /><br/>
                    <div className='actions'>
                        <Button className=' add-btn btn' onClick={this.handleSubmit}>Show demand</Button>
                    </div>
                        <Child demands={this.state.demands} goodCounts = {this.state.goodCounts} dates = {this.state.dates}/>

                    </div>
                </div>
            </div>,
            document.getElementById('root')
        );
    }
}

export default Demand