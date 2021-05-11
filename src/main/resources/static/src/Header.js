import {
    AppBar,
    Toolbar,
    Typography,
    makeStyles,
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

const useStyles = makeStyles(() => ({
    logo: {
        fontFamily: "Work Sans, sans-serif",
        fontWeight: 600,
        color: "#FFFEFE",
        textAlign: "left",
    },
    menuButton: {
        fontFamily: "Open Sans, sans-serif",
        fontWeight: 700,
        size: "18px",
        marginLeft: "38px",
    },
    toolbar: {
        display: "flex",
        justifyContent: "space-between",

    },
    header: {
        backgroundColor: "#0099ff",
        display: "block",
        paddingRight: "79px",
        paddingLeft: "20px",
    },
}));

export default function Header() {
    const { header, logo, toolbar, menuButton } = useStyles();

    const displayDesktop = () => {
        return (
            <Toolbar className={toolbar}>
                {femmecubatorLogo}
                <div>{getMenuButtons()}</div>
            </Toolbar>
        );
    };

    const femmecubatorLogo = (
        <Typography variant="h6" component="h1" className={logo}>
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
            );
        });
    };

    return (
        <header>
            <AppBar className={header}>{displayDesktop()}</AppBar>
        </header>

    );
}