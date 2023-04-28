import React, { useState, useEffect } from "react";
import { Button, Form, Input, Label } from "reactstrap";
import "./EditProduct.css";
import axios from "axios";
import {useNavigate, useParams} from 'react-router-dom'
import request from "../../../api/request";

const EditProduct = () => {
  const {id} = useParams();
  let navigate = useNavigate();

  useEffect(() => {
    const getProduct = async () => {
      const product = await request.product.getProduct(id).then(({data}) => data);
      //set product count or else there is no count here and it fails while adding to cart
      product.count = 1;
      setTitle(product.title);
      setPrice(String(product.price));
      setDescription(product.description);
      setCategory(product.category);
      setAvailableStocks(String(product.availableStocks));
      setImageLink(product.imageLink);
    }

    getProduct().catch(e => console.log(e));


  }, []);

  const [title, setTitle] = useState("");
  const [price, setPrice] = useState("");
  const [description, setDescription] = useState("Electronics");
  const [category, setCategory] = useState("");
  const [availableStocks, setAvailableStocks] = useState("");
  const [imageLink, setImageLink] = useState("");



  const categories = [
    "Electronics",
    "Moda",
    "Ev dekorasyonu",
    "Spor",
    "Hobi",
    "Süpermarket",
  ];


  const handleSubmit = async (e) => {
    e.preventDefault();
    await axios.put('http://localhost:8080/products/'+id, {
      title: title,
      price: price,
      description: description,
      category: category,
      availableStocks: availableStocks,
      imageLink: imageLink,
    }, {
      headers: {'Content-Type': 'application/json'}}).then(response => {
      console.log(response);
    })
    .catch(error => {
      console.log(error);
    });
    navigate(`/product/${id}`, {replace: true});
  };

  const deleteProduct = async () => {
    await axios.delete('http://localhost:8080/products/'+id).then(response => {
      console.log(response);
    })
    .catch(error => {
      console.log(error);
    });
    navigate(`/`, {replace: true});
  }

  return (
    <section>
      <h1 className="header">Edit Product</h1>
      <Form onSubmit={handleSubmit} className="form">
        <Label for="title" className="label">
          Product Title:
        </Label>
        <Input
          className="input"
          type="text"
          value={title}
          id="title"
          autoComplete="off"
          onChange={(e) => {
            setTitle(e.target.value);
          }}
          required
        ></Input>
        <Label for="price" className="label">
          Price:
        </Label>
        <Input
          className="input"
          type="text"
          id="price"
          value={price}
          autoComplete="off"
          onChange={(e) => {
            setPrice(e.target.value);
          }}
          required
        ></Input>
        <Label for="desription" className="label">
          Description:
        </Label>
        <Input
          className="textarea"
          type="textarea"
          id="description"
          value={description}
          autoComplete="off"
          rows="4" 
          cols="40"
          onChange={(e) => {
            setDescription(e.target.value);
          }}
          required
        ></Input>
        <Label for="category" className="label">
          Category:
        </Label>
        <Input
          className="input"
          type="select"
          id="category"
          value={category}
          autoComplete="off"
          onChange={(e) => {
            setCategory(e.target.value);
          }}
          multiple={false}
          required
        >{categories.map(category => <option key={category}>{category}</option>)}</Input>
        <Label for="availableStocks" className="label">
          Available Stocks:
        </Label>
        <Input
          className="input"
          type="text"
          id="availableStocks"
          autoComplete="off"
          value={availableStocks}
          onChange={(e) => {
            setAvailableStocks(e.target.value);
          }}
          required
        ></Input>
        <Label for="imageLink" className="label">
          Image Link:
        </Label>
        <Input
          className="input"
          type="text"
          id="imageLink"
          autoComplete="off"
          value={imageLink}
          onChange={(e) => {
            setImageLink(e.target.value);
          }}
          required
        ></Input>
        <Button type="submit" className="button">
                Edit Product
        </Button>
      </Form>
      <Button className="button" onClick={() => deleteProduct(id)}>
          Delete Product
      </Button>
    </section>
  );
};

export default EditProduct;
