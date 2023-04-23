import React, {useState} from 'react';
import "./Shipping.css";
import {Grid, Input, TextField} from "@mui/material";
import {useDispatch} from "react-redux";
import {emptyItems} from "../../features/cartSlice";
import {useNavigate} from "react-router-dom";

function ShippingComp() {
    const dispatch = useDispatch();
    const [countryName, setCountryName] = useState("");
    const [cityName, setCityName] = useState("");
    const [districtName, setDistrictName] = useState("");
    const [addressName, setAddressName] = useState("");
    let navigate = useNavigate();

    const resetEverything = () => {
        dispatch(emptyItems());
        document.getElementById("paymentContainer").style.display="none";
        document.getElementById("shippingContainer").style.display="none";
        document.getElementById("cartContainer").classList.remove("drop");
        document.getElementById("paymentContainer").classList.remove("drop");
        document.getElementById("shippingContainer").classList.remove("drop");
        document.getElementById("checkoutComplete").style.display="none";
        navigate(`/`, {replace: true});
    }

    const handleSubmit = (event) => {
        event.preventDefault();
        if (countryName.length < 2) {
            alert("Please Enter a valid Country Name")
            return;
        }
        if (cityName.length < 2) {
            alert("Please Enter a valid City Name")
            return;
        }
        if (districtName.length < 2) {
            alert("Please Enter a valid District Name")
            return;
        }
        if (addressName.length < 2) {
            alert("Please Enter a valid Address")
            return;
        }
        document.getElementById("shippingContainer").classList.add("drop");
        document.getElementById("checkoutComplete").style.display="flex";
        setTimeout(()=>{resetEverything()}, 2000);
    }

    const handleChange = (event) => {
        switch (event.target.id) {
            case "countryName":
                setCountryName(event.target.value);
                break;
            case "cityName":
                setCityName(event.target.value)
                break;
            case "districtName":
                setDistrictName(event.target.value)
                break;
            case "addressName":
                setAddressName(event.target.value)
                break;
            default:
        }
    }

    return (
        <Grid container className="shippingContainer animate" id="shippingContainer" display="none">
            <label className="heading">Shipping Address</label>
            <form onSubmit={handleSubmit}>
                <Grid container item>
                    <Grid item xs={12}>
                        <TextField fullWidth required={true} id="countryName" margin="dense"
                                   placeholder={"Country"}
                                   variant="standard" size="small"
                                   value={countryName}
                                   onChange={handleChange}/>
                    </Grid>

                    <Grid item xs={12}>
                        <TextField fullWidth required={true} id="cityName" margin="dense"
                                   placeholder={"City"}
                                   variant="standard" size="small"
                                   value={cityName}
                                   onChange={handleChange}/>
                    </Grid>


                    <Grid item xs={12}>
                        <TextField fullWidth required={true} id="districtName" margin="dense"
                                   placeholder={"District"}
                                   variant="standard" size="small"
                                   value={districtName}
                                   onChange={handleChange}/>
                    </Grid>

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
