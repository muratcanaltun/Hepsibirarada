import React, {useState} from 'react';
import "./Shipping.css";
import {Grid, Input, TextField} from "@mui/material";
import {useDispatch, useSelector} from "react-redux";
import {emptyItems} from "../../features/cartSlice";
import {useNavigate} from "react-router-dom";
import axios from "axios";

function ShippingComp() {
    const dispatch = useDispatch();
    const [addressName, setAddressName] = useState("");
    let navigate = useNavigate();

    const myCart = useSelector((state) => state.cart.myCart);

    const resetEverything = () => {
        dispatch(emptyItems());
        document.getElementById("paymentContainer").style.display="none";
        document.getElementById("shippingContainer").style.display="none";
        document.getElementById("cartContainer").classList.remove("drop");
        document.getElementById("paymentContainer").classList.remove("drop");
        document.getElementById("shippingContainer").classList.remove("drop");
        document.getElementById("checkoutComplete").style.display="none";
        navigate(`/orders`, {replace: true});
    }

    const handleSubmit = (event) => {
        event.preventDefault();
        if (addressName.length < 2) {
            alert("Please Enter a valid Address")
            return;
        }
        axios.post('http://localhost:8080/orders', {
            customerUsername: 'Customer',
            storeUsername: 'Store',
            products: myCart.map((product,index) => (product.id))
        })
            .then(function (response) {
                console.log(response);
            })
            .catch(function (error) {
                console.log(error);
            })



        document.getElementById("shippingContainer").classList.add("drop");
        document.getElementById("checkoutComplete").style.display="flex";
        setTimeout(()=>{resetEverything()}, 2000);
    }

    const handleChange = (event) => {
        switch (event.target.id) {
            case "addressName":
                setAddressName(event.target.value)
                break;
            default:
        }
    }

    return (
        <Grid container className="shippingContainer animate" id="shippingContainer" display="none">
            <Grid item xs={12}>
                <label className="heading">Shipping Address</label>
            </Grid>

            <form onSubmit={handleSubmit}>
                <Grid container item>
                    <Grid item xs={12}>
                        <TextField fullWidth required={true} id="addressName" margin="dense"
                                   placeholder={"Address"}
                                   variant="standard" size="small"
                                   value={addressName}
                                   onChange={handleChange}/>
                    </Grid>
                </Grid>
                <Input type="submit" value="Complete Order"></Input>
            </form>
        </Grid>);
}

export default ShippingComp;
