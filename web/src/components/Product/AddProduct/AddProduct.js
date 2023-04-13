import React, {useCallback, useEffect, useState} from "react";
import {Button, Form, FormGroup, Input, Label} from "reactstrap";
import "./AddProduct.css";
import {Controller, useForm} from "react-hook-form";
import request from '../../../api/request'

const AddProduct = () => {
    const [stores, setStores] = useState([])

    const categories = [
        'Electronics',
        'Moda',
        'Ev dekorasyonu',
        'Spor',
        'Hobi',
        'Süpermarket'
    ];

    const {control, handleSubmit, resetField} = useForm({
        mode: 'onSubmit',
        defaultValues: {
            category: categories[0]
        }
    })

    const onSubmit = useCallback(state => {
        request.product.addProduct(state).catch(e => console.log(e))
    }, [])

    useEffect(() => {
        const setStoresFromServer = async () => {
            const currentStores = await request.store().then(({data}) => data)
            setStores(currentStores)
            resetField('store', {
                defaultValue: currentStores[0].username
            })
        }

        setStoresFromServer().catch(e => console.log(e))
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
                />} name={'title'}/>
            </FormGroup>
            <FormGroup className="formGroup">
                {" "}
                <Label for="price" className="label">
                    Price
                </Label>
                <Controller control={control} rules={{
                    required: true,
                    pattern: /^[0-9]+$/
                }} render={({field: {onChange}, fieldState: {error}}) => <Input
                    className="input"
                    type="number"
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
                    type="textarea"
                    name="description"
                    onChange={(e) => onChange(e.target.value)}
                    required
                    invalid={error !== undefined}
                    bsSize={'lg'}
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
                >{categories.map(category => <option key={category}>{category}</option>)}</Input>} name={'category'}/>
            </FormGroup>
            <FormGroup className="formGroup">
                {" "}
                <Label for="store" className="label">Store</Label>
                <Controller control={control} rules={{
                    required: true
                }} render={({field: {onChange}, fieldState: {error}}) => <Input
                    className="input"
                    type="select"
                    name="store"
                    onChange={(e) => onChange(e.target.value.username)}
                    required
                    invalid={error !== undefined}
                    multiple={false}
                    size="lg"
                >{stores.map(store => <option key={store.id}>{store.username}</option>)}</Input>} name={'store'}/>
            </FormGroup>
            <FormGroup className="formGroup">
                {" "}
                <Label for="availableStocks" className="label">
                    Available stocks
                </Label>
                <Controller control={control} rules={{
                    required: true,
                    pattern: /^[0-9]+$/
                }} render={({field: {onChange}, fieldState: {error}}) => <Input
                    className="input"
                    type="number"
                    name="availableStocks"
                    onChange={(e) => onChange(e.target.value)}
                    required
                    placeholder={'Put the number'}
                    invalid={error !== undefined}
                    size="20"
                />} name={'availableStocks'}/>
            </FormGroup>
            <FormGroup className="formGroup">
                {" "}
                <Label for="imageLink" className="label">
                    Product image link
                </Label>
                <Controller control={control} rules={{
                    required: true,
                    pattern: {
                        value: /(https?:\/\/)?([\w-]{1,32}\.[\w-]{1,32})[^\s@]*$/,
                        message: 'Put the link'
                    }
                }} render={({field: {onChange}, fieldState: {error}}) => <Input
                    className="input"
                    type="text"
                    name="imageLink"
                    onChange={(e) => onChange(e.target.value)}
                    required
                    invalid={error !== undefined}
                    size="20"
                    placeholder={'Put the link'}
                />} name={'imageLink'}/>
            </FormGroup>
            <Button type="submit" className="button">
                Add Product
            </Button>
        </Form>
    );
}

export default AddProduct;
