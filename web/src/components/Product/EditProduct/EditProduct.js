import React, { useState, useEffect } from "react";
import { Button, Form, Input, Label } from "reactstrap";
import "./EditProduct.css";
import axios from "axios";
import {useParams} from 'react-router-dom'

const EditProduct = () => {
  const [title, setTitle] = useState("");
  const [price, setPrice] = useState("");
  const [description, setDescription] = useState("Electronics");
  const [category, setCategory] = useState("");
  const [availableStocks, setAvailableStocks] = useState("");
  const [imageLink, setImageLink] = useState("");

  const {id} = useParams();

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
      title,
      price,
      description,
      category,
      availableStocks,
      imageLink,
    }).then(response => {
      console.log(response);
    })
    .catch(error => {
      console.log(error);
    });
  };

  const deleteProduct = async () => {
    await axios.delete('http://localhost:8080/products/'+id).then(response => {
      console.log(response);
    })
    .catch(error => {
      console.log(error);
    });

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
          type="number"
          id="availableStocks"
          autoComplete="off"
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
