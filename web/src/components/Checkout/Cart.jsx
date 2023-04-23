import React from 'react';
import {useSelector} from "react-redux";
import {Grid, Input, ListItem, ListItemText} from "@mui/material";
import List from "@mui/material/List";
import {getTotal} from "../../features/cartSlice";
import "./Cart.css";


function CartComp(props) {
    const setActiveStep = props.setActiveStep;
    const titleCreator = (price, count) => {
        return "$" + price + " Count: " + count;
    }

    const myCart = useSelector((state) => state.cart.myCart);

    let myButton;
    if(myCart.length > 0) {
        myButton =  <Input value="Next" type="submit" sx={{marginTop: "1vh"}}
                           onClick={()=>{
                               document.getElementById("cartContainer").classList.add("drop");
                               document.getElementById("paymentContainer").classList.remove("drop");
                               document.getElementById("paymentContainer").style.display="flex";
                               setActiveStep(1);
                           }}
        ></Input>
    }

    return (<Grid container className="cartContainer" id="cartContainer">
            <Grid container item xs={12}>
                <label>Items in cart</label>
            </Grid>
            <Grid container item xs={12} className={"productsHolder"}>
                <List dense={true}>
                    {myCart.map((product, index) => (
                        <Grid item xs={12}>
                            <ListItem sx={{border: "solid 0.5px black"}}>
                                <Grid container item>
                                    <Grid item xs={10}>
                                        <ListItemText
                                            primary={product.title}
                                            secondary={titleCreator(product.price, product.count)}
                                        />
                                    </Grid>
                                    <Grid item container xs={2} display="flex" alignItems="center">
                                        <img width="40px" height="40px" alt="product" src={product.imageLink}/>
                                    </Grid>
                                </Grid>
                            </ListItem>
                        </Grid>
                    ))}
                </List>
            </Grid>
            <Grid container item xs={12} className={"infoHolder"}>
                <Grid item xs={12}>
                    <label>Total: ${getTotal(myCart)}</label>
                </Grid>
                <Grid item xs={12}>
                    {myButton}
                </Grid>
            </Grid>
        </Grid>

    )

}

export default CartComp;
