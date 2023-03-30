import React from 'react'
import {Button, Grid, ListItem, ListItemText} from "@mui/material";
import {useDispatch, useSelector} from "react-redux";
import {emptyItems, getTotal} from "../features/cartSlice";
import List from "@mui/material/List";
import Divider from "@mui/material/Divider";
import {useNavigate} from "react-router-dom";

//this component displays items in cart
function CartMain() {
    let navigate = useNavigate();
    const myCart = useSelector((state) => state.cart.myCart);
    const dispatch = useDispatch();
    const titleCreator = (price) => {
        return "$" + price;
    }

    //when you click checkout it opens checkout screen
    const checkoutHandler = () => {
        navigate(`/checkout`, {replace: true})
    }
    //when you click cancel it empties the cart state array
    const cancelHandler = () => {
        dispatch(emptyItems());
    }

    return (
        <Grid container display="flex">
            <Grid item xs={12}>
                <Grid item xs={12} sx={{marginLeft: 3}}>
                    <h2>{myCart.length} item(s)</h2>
                </Grid>
                <Grid container xs={12} display="flex">
                    {myCart.map((product, index) => (
                        <List dense={true}>
                            <ListItem>
                                <Grid container>
                                    <Grid item xs={12}>
                                        <ListItemText
                                            primary={product.title}
                                            secondary={titleCreator(product.price)}
                                        />
                                    </Grid>
                                </Grid>
                            </ListItem>
                        </List>
                    ))}
                </Grid>
                <h4 style={{marginLeft: 15}}>Total: ${getTotal(myCart)}</h4>
                <Divider variant="middle" sx={{marginTop: 3, marginBottom: 3}}/>
            </Grid>
            <Grid item xs={6}>
                <Button onClick={checkoutHandler} variant="contained"
                        sx={{backgroundColor: "orangered", marginLeft: 2}}>Checkout</Button>
            </Grid>
            <Grid item xs={6}>
                <Button onClick={cancelHandler} variant="contained"
                        sx={{backgroundColor: "red", marginLeft: 2}}>Cancel</Button>
            </Grid>
        </Grid>)
}

export default CartMain;
