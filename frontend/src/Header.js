import {
    AppBar,
    Toolbar,
    Typography,
    Button,
} from "@material-ui/core";
import React from "react";
import { Link as RouterLink } from "react-router-dom";
import {Route, Router} from 'react-router-dom'
import Warehouses from "./Warehouses";
import Goods from "./Goods";

const headersData = [
    {
        label: "Warehouses",
        href: "/warehouses",
    },
    {
        label: "Goods",
        href: "/goods",
    },
    {
        label: "Sales",
        href: "/sales",
    },
    {
        label: "Logout",
        href: "/login",
    }
];

export default function Header() {
    const displayDesktop = () => {
        return (
            <Toolbar className="toolbar">
                {femmecubatorLogo}
                <div>{getMenuButtons()}</div>
            </Toolbar>
        );
    };

    const femmecubatorLogo = (
        <Typography variant="h6" component="h1" className="logo">
            Wholesale company
        </Typography>
    );

    const getMenuButtons = () => {
        return headersData.map(({ label, href }) => {
            return (
                    <Button
                        {...{
                            key: label,
                            color: "inherit",
                            to: href,
                            component: RouterLink
                        }}
                    >
                        {label}
                    </Button>
            )
        });
    };

    return (
        <header>
            <AppBar className="header">{displayDesktop()}</AppBar>
        </header>

    );
}