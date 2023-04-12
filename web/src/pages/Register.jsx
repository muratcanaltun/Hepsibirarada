import React, { useState } from "react";
import { useEffect } from "react";
import { Button, Form, FormGroup, Label, Input, Image } from "reactstrap";
import axios from "axios";


const Register = () => {

    const [userName, setUser] = useState("");
    const [password, setPassword]= useState("");
    const [email, setEmail]= useState("");
    const onSubmit = async (e) => {
        e.preventDefault()
        const post = { username: userName, email: email, password: password }
        try {
            const res = await axios.post('http://localhost:8080/customers', post)
            console.log(res.data)

        } catch (e) {
            alert(e)
        }
        alert("Register Successfully Completed");
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
                    E-Mail
                </Label>
                <Input
                    className="input"
                    type="email"
                    name="price"
                    onChange={(event) => {
                        setEmail(event.target.value)
                    }}
                    required
                    size="20"
                    minlength="2"
                    maxlength="99"
                ></Input>
            </FormGroup>
            <FormGroup className="formGroup">
                {" "}
                <Label for="features" className="label">
                    Password
                </Label>
                <Input
                    className="input"
                    type="password"
                    name="features"
                    onChange={(event) => {
                        setPassword(event.target.value)
                    }}
                    required
                    size="20"
                    minlength="2"
                    maxlength="99"
                ></Input>
            </FormGroup>
            <FormGroup className="formGroup">
                {" "}
                <Label for="features" className="label">
                    Select User Type
                </Label>
                <label>
                    <input
                        type="radio"
                        value="store"

                    />
                    Store Owner
                </label>
                <label>
                    <input
                        type="radio"
                        value="customer"

                    />
                    Customer
                </label>
            </FormGroup>

            <Button type="submit" className="button">
                Register
            </Button>
        </Form>
    );
}

export default Register;