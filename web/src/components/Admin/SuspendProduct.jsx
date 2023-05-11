import React from 'react'
import { useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import { List, ListItem, ListItemText, ListItemSecondaryAction, IconButton } from '@mui/material';

function SuspendProduct() {
  const products = useSelector((state) => state.products.productsArray);
  let navigate = useNavigate();

  const suspendProduct = async (e, product) => {
    e.preventDefault();
    await axios.put('http://localhost:8080/products/' + product.id, { stopSales: true }).then(response => {
      console.log(response);
    })
      .catch(error => {
        console.log(error);
      });
    navigate(`/`, { replace: true });
  }

  const unSuspendProduct = async (e, product) => {
    e.preventDefault();
    await axios.put('http://localhost:8080/products/' + product.id, { stopSales: false }).then(response => {
      console.log(response);
    })
      .catch(error => {
        console.log(error);
      });
    navigate(`/`, { replace: true });
  }

  return (
    <List>
    {products.map((product, index) => (
      <ListItem key={index}>
        <ListItemText primary={`Product name: ${product.title}`} secondary={`Product id: ${product.id}`} />
        <ListItemSecondaryAction>
          <IconButton onClick={() => suspendProduct(product)}>
            Suspend
          </IconButton>
          <IconButton onClick={() => unSuspendProduct(product)}>
            Unsuspend
          </IconButton>
        </ListItemSecondaryAction>
      </ListItem>
    ))}
  </List>
  );
}

export default SuspendProduct;
