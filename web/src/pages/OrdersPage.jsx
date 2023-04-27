import React, {useEffect, useState} from 'react';
import {Chip, Divider, Grid, ListItem, ListItemText} from "@mui/material";
import "./OrdersPage.css";
import request from "../api/request";
import axios from "axios";
import List from "@mui/material/List";
import {getProductFromID, getTotal} from "../features/cartSlice";
import {useSelector} from "react-redux";

function OrdersPage() {
    const [orders, setOrders] = useState([{storeUsername: "", customerUsername: "", status: "", products: []}]);
    const productsArray = useSelector((state) => state.products.productsArray);
    let axios1 = require('axios')

    function delay() {
        return new Promise(function (resolve, reject) {
            setTimeout(function () {
                resolve(42);
            }, 200);
        });
    }

    //for getting the products asynchronously
    async function getAllData() {
        try {
            let orders = await axios.get(`http://localhost:8080/orders`)
            await delay();
            return orders;
        } catch (error) {
            return null;
        }
    }


    (async function () {

    })();


    useEffect(() => {
        const getOrders = async () => {
            let orders = await getAllData();
            setOrders(orders.data);
            console.log(orders.data);
        }
        getOrders().catch(e => console.log(e))
    }, []);


    return (
        <Grid container sx={{padding: "5vw"}}>
            <Grid container item xs={12} className={"infoContainer"}>
                <label>Orders</label>
            </Grid>
            <Grid container item xs={12}>
                <List dense={false}>
                    {orders.map((order, index) => (
                        <Grid item xs={12}>
                            <ListItem sx={{marginBottom: "5px"}}>
                                <Grid container item>
                                    <Grid item xs={12}>
                                        <ListItemText style={{color: "blue"}}
                                            primary={order.customerUsername}
                                            secondary={order.storeUsername}
                                        />
                                    </Grid>
                                    <Grid container item xs={12}>
                                        <List dense={true}>
                                            {order.products.map((product, index) => (
                                                <Grid item xs={12}>
                                                    <ListItem sx={{border: "solid 0.5px black"}}>
                                                        <Grid container item>
                                                            <Grid item xs={12}>
                                                                <ListItemText
                                                                    primary={getProductFromID(productsArray, product).title}
                                                                />
                                                            </Grid>
                                                            <Grid item container xs={2} display="flex"
                                                                  alignItems="center">
                                                                <img width="40px" height="40px" alt="product"
                                                                     src={getProductFromID(productsArray, product).imageLink}/>
                                                            </Grid>
                                                        </Grid>
                                                    </ListItem>
                                                </Grid>
                                            ))}
                                        </List>
                                    </Grid>
                                    <Grid item container xs={12} display="flex" alignItems="center">
                                        <label style={{color: "lightskyblue"}}>{order.status}</label>
                                    </Grid>
                                </Grid>
                            </ListItem>
                            <Divider variant="middle" />
                        </Grid>

                    ))}

                </List>

            </Grid>

        </Grid>);

}

export default OrdersPage;