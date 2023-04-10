import React, {useState} from "react";
import {Button, Form, FormGroup, Input, Label} from "reactstrap";
import "./AddProduct.css";

const AddProduct = () => {

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
                    Product Name
                </Label>
                <Input
                    className="input"
                    type="text"
                    name="product_name"
                    onChange={(e) => setName({name: e.target.value})}
                    required
                    size="20"
                    minlength="2"
                    maxlength="10"
                />
            </FormGroup>
            <FormGroup className="formGroup">
                {" "}
                <Label for="price" className="label">
                    Price
                </Label>
                <Input
                    className="input"
                    type="text"
                    name="price"
                    onChange={(e) => setPrice({price: e.target.value})}
                    required
                    size="20"
                    minlength="2"
                    maxlength="10"
                />
            </FormGroup>
            <FormGroup className="formGroup">
                {" "}
                <Label for="features" className="label">
                    Features
                </Label>
                <Input
                    className="input"
                    type="text"
                    name="features"
                    onChange={(e) => setFeatures({features: e.target.value})}
                    required
                    size="20"
                    minlength="2"
                    maxlength="10"
                />
            </FormGroup>
            <FormGroup className="formGroup">
                {" "}
                <Label for="description" className="label">
                    Description
                </Label>
                <Input
                    className="input description"
                    type="text"
                    name="description"
                    onChange={(e) => setDescription({description: e.target.value})}
                    required
                    size="20"
                    minlength="2"
                    maxlength="10"
                />
            </FormGroup>
            <Button type="submit" className="button">
                Add Product
            </Button>
        </Form>
    );
}

export default AddProduct;
