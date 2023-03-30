import React, { useState } from "react";
import { useEffect } from "react";
import { Button, Form, FormGroup, Label, Input, Image } from "reactstrap";
import axios from "axios";


const Login = () => {
    const [userName, setUser] = useState("");
    const [password, setPassword]= useState("");


    const onSubmit = async (e) => {
        e.preventDefault()
        try {
            const res = await axios.get(`http://localhost:8080/customers/${userName}`).then((response) => {
               let expectedPassword = response.data.password;
                console.log(response.data);
                if(password === expectedPassword) {
                    alert("Login Successfully Completed");
                } else {
                    alert("Please check your information");
                }
            });

        } catch (e) {
            alert(e)
        }
    }


    return (
        <Form className="form" onSubmit={onSubmit}>
            <FormGroup className="formGroup">
                <Label for="product_name" className="label">
                    Username
                </Label>
                <Input
                    className="input"
                    type="text"
                    name="product_name"
                    onChange={(event) => {
                        setUser(event.target.value)
                    }}
                    required
                    size="20"
                    minlength="2"
                    maxlength="99"
                ></Input>
            </FormGroup>
            <FormGroup className="formGroup">
                {" "}
                <Label for="price" className="label">
                    Password
                </Label>
                <Input
                    className="input"
                    type="password"
                    name="price"
                    onChange={(event) => {
                        setPassword(event.target.value)
                    }}
                    required
                    size="20"
                    minlength="2"
                    maxlength="99"
                ></Input>
            </FormGroup>
            <Button type="submit" className="button">
                Login
            </Button>
        </Form>
    );
}

export default Login;
