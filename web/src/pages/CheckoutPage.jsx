import React from 'react';
import {Grid} from "@mui/material";
import "./CheckoutPage.css";
import PaymentComp from "../components/Checkout/Payment";
import ShippingComp from "../components/Checkout/Shipping";
import CartComp from "../components/Checkout/Cart";
import HorizontalLinearStepper from "../components/Checkout/Stepper";

function CheckoutPage() {
    const [activeStep, setActiveStep] = React.useState(0);
    return (
        <Grid container className="checkoutMain" id="checkoutMain">
            <Grid item xs={12} justifyContent="center" height={"100px"}>
                <HorizontalLinearStepper activeStep={activeStep} setActiveStep={setActiveStep}/>
            </Grid>
            <Grid item xs={12} justifyContent="center" id="checkoutComplete" display="none">
                <label className="orderCompleteLabel animate">Order Complete!</label>
            </Grid>
            <Grid item xs={4} justifyContent="center">
                <CartComp setActiveStep={setActiveStep}/>
            </Grid>
            <Grid item xs={4} justifyContent="center">
                <PaymentComp setActiveStep={setActiveStep}/>
            </Grid>
            <Grid item xs={4} justifyContent="center" >
                <ShippingComp setActiveStep={setActiveStep}/>
            </Grid>
        </Grid>
    )
}

export default CheckoutPage;
