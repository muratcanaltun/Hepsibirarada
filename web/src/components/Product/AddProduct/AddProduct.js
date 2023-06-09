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
    const [imageLink, setImageLink] = useState(null);



    const categories = [
        "Electronics",
        "Home Furnishing",
        "Clothing",
        "Food & Drink",
        "Office",
        "Other",
    ];

    let productImageShowcase = <img id="productImageShowcase" src={imageLink} style={{display: "none", width: 250, height: 375}}/>

    const handleSubmit = async (e) => {
        e.preventDefault();
        if(price < 0) {
            alert("Please enter a valid price");
            return;
        } else if (availableStocks < 0) {
            alert("please enter a valid stocks value");
            return;
        }
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


    function encodeImageFileAsURL() {
        let file = document.getElementById("imageInput").files[0];
        let reader = new FileReader();
        reader.onloadend = function() {
            console.log('RESULT', reader.result);
            let imageBase = reader.result;
            setImageLink(imageBase);
            console.log(imageLink);
            document.getElementById("productImageShowcase").style.display="flex";
        }
        reader.readAsDataURL(file);


    }

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
                    Product image
                </Label>
                <input id="imageInput" type="file" onChange={() =>encodeImageFileAsURL()}/>
                {productImageShowcase}
            </FormGroup>
            <Button type="submit" className="button">
                Add Product
            </Button>
        </Form>
    );
}

export default AddProduct;
