import React, {useCallback, useState} from "react";
import {Button, Form, FormGroup, Input, Label} from "reactstrap";
import "./AddProduct.css";
import {useForm, Controller} from "react-hook-form";

const AddProduct = () => {
   const {control, handleSubmit} = useForm()

    const categories = [
        'Electronics',
        'Moda',
        'Ev dekorasyonu',
        'Spor',
        'Hobi',
        'Süpermarket'
    ];

    const onSubmit = useCallback(state => {
        console.log(state)
    }, [])

    return (
        <Form onSubmit={handleSubmit(onSubmit)} className="form">
            <FormGroup className="formGroup">
                <Label for="product_name" className="label">
                    Product Name
                </Label>
                <Controller control={control} rules={{
                    required: true
                }} render={({field: {onChange}, fieldState: {error}}) => <Input
                    className="input"
                    type="text"
                    name="product_name"
                    onChange={(e) => onChange(e.target.value)}
                    invalid={error !== undefined}
                    required
                    size="20"
                    minlength="2"
                    maxlength="10"
                />} name={'product_name'}/>
            </FormGroup>
            <FormGroup className="formGroup">
                {" "}
                <Label for="price" className="label">
                    Price
                </Label>
                <Controller control={control} rules={{
                    required: true
                }} render={({field: {onChange}, fieldState: {error}}) => <Input
                    className="input"
                    type="text"
                    name="price"
                    onChange={(e) => onChange(e.target.value)}
                    required
                    invalid={error !== undefined}
                    size="20"
                    minlength="2"
                    maxlength="10"
                />} name={'price'}/>
            </FormGroup>
            <FormGroup className="formGroup">
                {" "}
                <Label for="description" className="label">
                    Description
                </Label>
                <Controller control={control} rules={{
                    required: true
                }} render={({field: {onChange}, fieldState: {error}}) => <Input
                    className="input description"
                    type="text"
                    name="description"
                    onChange={(e) => onChange(e.target.value)}
                    required
                    invalid={error !== undefined}
                    size="20"
                    minlength="2"
                    maxlength="10"
                />} name={'description'}/>
            </FormGroup>
            <FormGroup className="formGroup">
                {" "}
                <Label for="category" className="label">
                    Product category
                </Label>
                <Controller control={control} rules={{
                    required: true
                }} render={({field: {onChange}, fieldState: {error}}) => <Input
                    className="input"
                    type="select"
                    name="category"
                    onChange={(e) => onChange(e.target.value)}
                    required
                    invalid={error !== undefined}
                    multiple={false}
                    size="lg"
                    minlength="2"
                    maxlength="10"
                >{categories.map(category => <option key={category}>{category}</option>)}</Input>} name={'category'}/>
            </FormGroup>
            <Button type="submit" className="button">
                Add Product
            </Button>
        </Form>
    );
}

export default AddProduct;
