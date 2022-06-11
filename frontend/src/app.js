import './App.css';
import Header from './Header';
import {Route, Routes, BrowserRouter, Navigate } from 'react-router-dom'
import Warehouses from "./Warehouses";
import Goods from "./Goods";
import Sales from "./Sales";
import React from "react";
import Demand from "./Demand";
import {AppBar, Toolbar} from "@material-ui/core";
import Login from "./Login";

function App() {
    return (
        <div className="App">
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