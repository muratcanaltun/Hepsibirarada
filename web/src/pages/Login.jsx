import React, { useState } from "react";
import { useEffect } from "react";
import { Button, Form, FormGroup, Label, Input, Image } from "reactstrap";


const Login = () => {

    const [name, setName] = useState('')
    const [price, setPrice] = useState('')
    const [category, setCategory] = useState('')
    const [description, setDescription] = useState('')
    const [features, setFeatures] = useState('')
    //const [image, setImage] = useState([])

    const categories = [
        'Electronics',
        'Moda',
        'Ev dekorasyonu',
        'Spor',
        'Hobi',
        'Süpermarket'
    ];

    return (
        <Form className="form">
            <FormGroup className="formGroup">
                <Label for="product_name" className="label">
                    Username
                </Label>
                <Input
                    className="input"
                    type="text"
                    name="product_name"
                    onChange={(e) => setName({ name: e.target.value })}
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
                    onChange={(e) => setPrice({ price: e.target.value })}
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
