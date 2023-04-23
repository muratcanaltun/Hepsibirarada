import React, {useState} from 'react';
import "./Payment.css";
import {Grid, Input, TextField} from "@mui/material";

function PaymentComp(props) {
    const [nameField, setNameField] = useState("");
    const [cardNumber, setCardNumber] = useState("");
    const [cardExp, setCardExp] = useState("");
    const [cardCCV, setCardCCV] = useState("");
    const setActiveStep = props.setActiveStep;

    const handleSubmit = (event) => {
        event.preventDefault();
        if (cardCCV.length < 3) {
            alert("Card CCV should be 3 digits!");
            return;
        }
        if (cardNumber.length < 19) {
            alert("Please fill Card Number!");
            return;
        }
        if (nameField.length < 5) {
            alert("Please write your name and surname!");
            return;
        }

        let currentYear = new Date().getFullYear();
        let maxYearString = (currentYear+20).toString();
        let minYearString = currentYear.toString();
        let minDate = new Date(minYearString);
        let maxDate = new Date(maxYearString);
        console.log(minDate);
        console.log(maxDate);

        let userDate = new Date(cardExp.toString());

        if (userDate > maxDate) {
            alert("Please enter a valid date before "+maxYearString);
            return;
        }
        if (userDate < minDate) {
            alert("Please enter a valid date after "+minYearString);
            return;
        }
        document.getElementById("shippingContainer").classList.remove("drop");
        document.getElementById("shippingContainer").style.display="flex";
        document.getElementById("paymentContainer").classList.add("drop");
        setActiveStep(2);
    }
    const handleChange = (event) => {
        let length = event.target.value.length;
        let value = event.target.value;
        switch (event.target.id) {
            case "cardHolderName":
                setNameField(value);
                break;
            case "cardNumber":
                if (event.keyCode === 8) {
                    setCardNumber(cardNumber.slice(0, -1));
                    break;
                } else if (length === 19) {
                    break;
                } else if (event.keyCode < 48 || event.keyCode > 57) {
                    break;
                } else if (length === 4 || length === 9 || length === 14) {
                    setCardNumber(value + "-");
                    break;
                } else {
                    setCardNumber(cardNumber + event.key);
                }
                break;
            case "cardExp":
                setCardExp(value)
                break;
            case "cardCCV":
                if (event.keyCode === 8) {
                    setCardCCV(cardCCV.slice(0, -1));
                    break;
                } else if (length === 3) {
                    break;
                } else if (event.keyCode < 48 || event.keyCode > 57) {
                    break;
                } else {
                    setCardCCV(cardCCV + event.key)
                }
                break;
            default:
        }

    }

    return (
        <Grid container className="paymentContainer animate" id="paymentContainer" display="none">
            <label className="heading">Payment Information</label>
            <form onSubmit={handleSubmit}>
                <Grid container item>
                    <Grid item xs={12}>
                        <TextField fullWidth required={true} type="text" id="cardHolderName"
                                   placeholder={"Cardholder Name"}
                                   margin="normal" variant="standard" size="medium"
                                   value={nameField}
                                   onChange={handleChange}/>
                    </Grid>
                    <Grid item xs={12}>
                        <TextField fullWidth type="text" required={true}
                                   id="cardNumber"
                                   placeholder={"Card Number"}
                                   margin="normal" variant="standard" size="medium"
                                   value={cardNumber}
                                   onKeyDown={handleChange}
                        />
                    </Grid>
                    <Grid item xs={12}>
                        <TextField  margin="normal" variant="standard" size="medium" required={true} type="month"
                                   id="cardExp"
                                   value={cardExp}
                                   onChange={handleChange}/>
                    </Grid>
                    <Grid item xs={12}>
                        <TextField required={true} type="tel" id="cardCCV"
                                   margin="dense" variant="standard" size="small" value={cardCCV}
                                   placeholder={"CCV"}
                                   onKeyDown={handleChange}/>
                    </Grid>
                </Grid>
                <Input type="submit" value="Next"></Input>
            </form>
        </Grid>);
}

export default PaymentComp;
