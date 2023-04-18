import React from 'react'
import {Button, Fab, Grid, ListItem, ListItemText} from "@mui/material";
import {useDispatch, useSelector} from "react-redux";
import {decreaseCount, emptyItems, getTotal, increaseCount} from "../features/cartSlice";
import List from "@mui/material/List";
import Divider from "@mui/material/Divider";
import {useNavigate} from "react-router-dom";
import {useCookies} from "react-cookie";
import AddOutlinedIcon from '@mui/icons-material/AddOutlined';
import RemoveOutlinedIcon from '@mui/icons-material/RemoveOutlined';

//this component displays items in cart
function CartMain() {
    let navigate = useNavigate();
    const myCart = useSelector((state) => state.cart.myCart);
    const dispatch = useDispatch();
    const [cookies, setCookie, removeCookie] = useCookies(['cart']);

    const deleteCookies = () => {
        //delete cookies previously created
        removeCookie("ids");
        removeCookie("counts");

    }
    const titleCreator = (price, count) => {
        return "$" + price + " piece: "+ count;
    }

    //when you click checkout it opens checkout screen
    const checkoutHandler = () => {
        navigate(`/checkout`, {replace: true})
    }
    //when you click cancel it empties the cart state array
    const cancelHandler = () => {
        //empty twice just to make sure don't question xd
        deleteCookies();
        deleteCookies();
        dispatch(emptyItems());
    }

    //increase selected item count
    const increaseHandler = (product) => {
        dispatch(increaseCount(product));
    }
    //decrease selected item count
    const decreaseHandler = (product) => {
        dispatch(decreaseCount(product));
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
                                            secondary={titleCreator(product.price, product.count)}
                                        />
                                    </Grid>
                                    <Grid item spacing={3} xs={12} sx={{marginBottom: "5px"}}>
                                        <Fab onClick={() => {
                                            increaseHandler(product)
                                        }} size="small" style={{
                                            position: 'absolute',
                                            height: 20,
                                            left: 45,
                                            width: 20,
                                            minHeight: 20,
                                            backgroundColor: "blue"
                                        }}>
                                            <AddOutlinedIcon fontSize="small"/>
                                        </Fab>
                                        <Fab onClick={() => {
                                            decreaseHandler(product)
                                        }} size="small" style={{
                                            position: 'absolute',
                                            height: 20,
                                            width: 20,
                                            minHeight: 20,
                                            backgroundColor: "blue"
                                        }}>
                                            <RemoveOutlinedIcon fontSize="small"/>
                                        </Fab>
                                    </Grid>
                                </Grid>
                            </ListItem>
                        </List>
                    ))}
                </Grid>
                <h4 style={{marginLeft: 15, marginTop: 20}}>Total: ${getTotal(myCart)}</h4>
                <Divider variant="middle" sx={{marginTop: 1, marginBottom: 2}}/>
            </Grid>
            <Grid item xs={6}>
                <Button onClick={checkoutHandler} variant="contained"
                        sx={{backgroundColor: "blue", marginLeft: 2}}>Checkout</Button>
            </Grid>
            <Grid item xs={6}>
                <Button onClick={cancelHandler} variant="contained"
                        sx={{backgroundColor: "lightBlue", marginLeft: 2}}>Cancel</Button>
            </Grid>
        </Grid>)
}

export default CartMain;
