import React, {useCallback, useEffect, useState} from "react";
import {Button, Form, FormGroup, Input, Label} from "reactstrap";
import "./AddProduct.css";
import {Controller, useForm} from "react-hook-form";
import request from '../../../api/request'
import axios from "axios";

const AddProduct = () => {
    const [stores, setStores] = useState([]);

    const [title, setTitle] = useState("");
    const [price, setPrice] = useState("");
    const [description, setDescription] = useState("");
    const [category, setCategory] = useState("Moda");
    const [availableStocks, setAvailableStocks] = useState("");
    const [store, setStore] = useState("");
    const [imageLink, setImageLink] = useState("");



    const categories = [
        'Electronics',
        'Moda',
        'Ev dekorasyonu',
        'Spor',
        'Hobi',
        'Süpermarket'
    ];


    const handleSubmit = async (e) => {
        e.preventDefault();
        await axios.post('http://localhost:8080/products', {
            title: title,
            price: price,
            description: description,
            category: category,
            store: store,
            availableStocks: availableStocks,
            imageLink: imageLink,
        }, {
            headers: {'Content-Type': 'application/json'}}).then(response => {
            console.log(response);
        })
            .catch(error => {
                console.log(error);
            });
    };

    useEffect(() => {
        const setStoresFromServer = async () => {
            const currentStores = await axios.get(`http://localhost:8080/stores`);
            let currentStoresData = currentStores.data;
            setStores(currentStoresData);
            console.log(currentStoresData);
        }

        setStoresFromServer().catch(e => console.log(e))
    }, [])

    return (
        <Form onSubmit={handleSubmit} className="form">
            <FormGroup className="formGroup">
                <Label for="product_name" className="label">
                    Product Name
                </Label>
                <Input
                    className="input"
                    type="text"
                    name="product_name"
                    onChange={(e) => setTitle(e.target.value)}
                    required
                    size="20"
                    minlength="2"
                    maxlength="20"
                />
            </FormGroup>
            <FormGroup className="formGroup">
                {" "}
                <Label for="price" className="label">
                    Price
                </Label>
                <Input
                    className="input"
                    type="number"
                    name="price"
                    onChange={(e) => setPrice(e.target.value)}
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
                    type="textarea"
                    name="description"
                    onChange={(e) => setDescription(e.target.value)}
                    required
                    bsSize={'lg'}
                />
            </FormGroup>
            <FormGroup className="formGroup">
                {" "}
                <Label for="category" className="label">
                    Product category
                </Label>
                <Input
                    className="input"
                    type="select"
                    name="category"
                    onChange={(e) => setCategory(e.target.value)}
                    value={category}
                    required
                    multiple={false}
                    size="lg"
                >{categories.map(category => <option key={category}>{category}</option>)}</Input>
            </FormGroup>
            <FormGroup className="formGroup">
                {" "}
                <Label for="store" className="label">Store</Label>
                <Input
                    className="input"
                    type="select"
                    name="store"
                    onChange={(e) => setStore(e.target.value)}
                    required
                    multiple={false}
                    size="lg"
                >{stores.map(store => <option key={store.id}>{store.username}</option>)}</Input>
            </FormGroup>
            <FormGroup className="formGroup">
                {" "}
                <Label for="availableStocks" className="label">
                    Available stocks
                </Label>
                <Input
                    className="input"
                    type="number"
                    name="availableStocks"
                    onChange={(e) => setAvailableStocks(e.target.value)}
                    required
                    placeholder={'Put the number'}
                    size="20"
                />
            </FormGroup>
            <FormGroup className="formGroup">
                {" "}
                <Label for="imageLink" className="label">
                    Product image link
                </Label>
                <Input
                    className="input"
                    type="text"
                    name="imageLink"
                    onChange={(e) => setImageLink(e.target.value)}
                    required
                    size="20"
                    placeholder={'Put the link'}
                />
            </FormGroup>
            <Button type="submit" className="button">
                Add Product
            </Button>
        </Form>
    );
}

export default AddProduct;
