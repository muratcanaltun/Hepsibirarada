import React from 'react'
import {Grid, Paper} from "@mui/material";
import {useSelector} from "react-redux";
import {useNavigate} from "react-router-dom";
import axios from "axios";
import './SuspendProduct.css';

function SuspendProduct() {
    const products = useSelector((state) => state.products.productsArray);
    let navigate = useNavigate();

    const suspendProduct = async (e, product) => {
        e.preventDefault();
        await axios.put('http://localhost:8080/products/'+product.id, {stopSales: true}).then(response => {
          console.log(response);
        })
        .catch(error => {
          console.log(error);
        });
        navigate(`/`, {replace: true});
      }

      const unSuspendProduct = async (e, product) => {
        e.preventDefault();
        await axios.put('http://localhost:8080/products/'+product.id, {stopSales: false}).then(response => {
          console.log(response);
        })
        .catch(error => {
          console.log(error);
        });
        navigate(`/`, {replace: true});
      }

    //map products so it displays all of them
    return (
        <Grid className="Main" container xs={12} md={10}>
            {products.map((product, index) => (
                <Grid className="paperHolder" item xs={12} sm={6} md={6} lg={2.8}>
                    <Paper className="paper">
                    <img alt="product" src={product.imageLink}/>
                        <Grid container display="flex" justifyContent="center" className="infoHolder">
                            <Grid item justifyContent="center" xs={12} className="item1">
                                <h4 style={{display: 'flex', justifyContent: 'center'}}>Product name: {product.title}</h4>
                            </Grid>
                            <Grid item justifyContent="center" xs={12} className="item1">
                                <h4 style={{display: 'flex', justifyContent: 'center'}}>Product id: {product.id}</h4>
                            </Grid>
                            <Grid item xs={12} className="item2">
                                {suspendProduct(product)}
                            </Grid>
                            <Grid item xs={12} className="item2">
                                {unSuspendProduct(product)}
                            </Grid>
                        </Grid>
                    </Paper>
                </Grid>
            ))}
        </Grid>
    );
}

export default SuspendProduct;
