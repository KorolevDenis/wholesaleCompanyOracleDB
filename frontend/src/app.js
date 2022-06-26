import './app.css';
import Header from './header/header';
import {Route, Routes, BrowserRouter, Navigate } from 'react-router-dom'
import Warehouses from "./warehouse/warehouses";
import Goods from "./good/goods";
import Sales from "./sale/sales";
import React from "react";
import Demand from "./modal/demand";
import {AppBar, Toolbar} from "@material-ui/core";
import Login from "./login/login";
import './index.css';

function App() {
    return (
        <div className="app">
            <BrowserRouter>
                <div>
                    <React.Fragment>
                        <AppBar position="fixed">
                            <Header/>
                        </AppBar>
                        <Toolbar/>
                    </React.Fragment>
                    <Routes>
                        <Route path="/" element={<Navigate to="/warehouses" />}/>
                        <Route path="/login" element={<Login/>}/>
                        <Route path="/goods" element={<Goods/>}/>
                        <Route path="/warehouses" elements={<><Warehouses warehouseNumber="1"/><Warehouses warehouseNumber="2"/></>}/>
                        <Route path="/sales" element={<Sales/>}/>
                        <Route path="/demand:id" element={<Demand/>}/>
                    </Routes>
                </div>
            </BrowserRouter>
        </div>
    );
}

export default App;