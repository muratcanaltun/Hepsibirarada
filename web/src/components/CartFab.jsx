import React from 'react'
import {Fab} from "@mui/material";
import ShoppingCartIcon from '@mui/icons-material/ShoppingCart';
import {setOpen} from "../features/drawerSlice";
import {useDispatch} from "react-redux";


//this is a floating button that manages if cart drawer is open
function CartFab() {
    const dispatch = useDispatch();

    const handleDrawerOpen = () => {
        dispatch(setOpen(true));
    };

    return (
        <Fab onClick={handleDrawerOpen} size="large" style={{
            position: 'fixed',
            right: "3vh",
            top: "3vh",
            height: 60,
            width: 60,
            minHeight: 60,
            backgroundColor: "rgba(189,59,0,0.76)"
        }}>
            <ShoppingCartIcon fontSize="large" color="action"/>
        </Fab>
    )
}

export default CartFab;
