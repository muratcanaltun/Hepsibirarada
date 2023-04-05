import React from 'react'
import {Button, Grid, Paper} from "@mui/material";
import {useDispatch, useSelector} from "react-redux";
import {addItem, myIndexOf} from "../../features/cartSlice";
import {useNavigate} from "react-router-dom";
import "./ListItem.css";

function ListItem() {
    let navigate = useNavigate();
    const products = useSelector((state) => state.products.productsArray);
    const myCart = useSelector((state) => state.cart.myCart);
    const dispatch = useDispatch();

    // add an item to cart
    const addToCart = (index) => {
        dispatch(addItem(products[index]));
    }

    const navigator = (productId) => {
        navigate(`/product/${productId}`, {replace: true})
    }

    //give this button to map function, so it maps another one for every single product
    const myButton = (product0, index0) => {
        let product = product0;
        let index = index0;
        let myButton0;
        //check if product is in cart, change the button accordingly
        if (myIndexOf(myCart, product) !== -1) {
            myButton0 = (<Button className="item3" onClick={() => {
                addToCart(index);
            }} variant="contained" sx={{backgroundColor: "rgba(236,106,0,0.4)"}}>In
                cart</Button>);
        } else {
            myButton0 = (<Button className="item3" onClick={() => {
                addToCart(index);
            }} variant="contained" sx={{backgroundColor: "rgba(220,72,46,0.72)"}}>Add To Cart</Button>);
        }
        return myButton0;
    }

    //map products so it displays all of them
    return (
        <Grid className="Main" container xs={12} md={10}>
            {products.map((product, index) => (
                <Grid className="paperHolder" item xs={12} sm={6} md={6} lg={2.8}>
                    <Paper className="paper">
                        <img alt="product" onClick={() => {
                            navigator(product.id)
                        }} src={product.image}/>
                        <Grid container display="flex" justifyContent="center" className="infoHolder">
                            <Grid item justifyContent="center" xs={12} className="item1">
                                <h4 style={{display: 'flex', justifyContent: 'center'}}>{product.title}</h4>
                            </Grid>
                            <Grid item xs={12} className="item2">
                                <h3 style={{display: 'flex', justifyContent: 'center'}}>${product.price}</h3>
                            </Grid>
                            <Grid item xs={12} className="item2">
                                {myButton(product, index)}
                            </Grid>
                        </Grid>
                    </Paper>
                </Grid>
            ))}
        </Grid>
    );
}

export default ListItem;
