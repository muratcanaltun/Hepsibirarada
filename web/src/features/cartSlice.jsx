import {createSlice} from '@reduxjs/toolkit'
import {Product} from "./productsSlice";

const initialState = {
    myCart: []
}

//function for getting a product from its id
export function getProductFromID(ProductsArray, id) {
    if (ProductsArray.length > 2) {
        for (let i = 0; i < ProductsArray.length; i++) {
            if (ProductsArray[i].id === id) {
                console.log("item searched and found");
                return ProductsArray[i];
            }
        }
    }
    return -1;
}

//since normal index functions can't differentiate between objects I had to create one
export function myIndexOf(myCart, item) {
    for (let i = 0; i < myCart.length; i++) {
        if (myCart[i].id === item.id) {
            return i;
        }
    }
    return -1;
}

//get total expense
export function getTotal(myCart) {
    let total = 0;
    for (let i = 0; i < myCart.length; i++) {
        total = total +  myCart[i].price * myCart[i].count;
    }
    return total.toFixed(2);
}

export const cartSlice = createSlice(
    {
        name: 'cart', initialState, reducers: {
            addItem: (state, item) => {
                if(myIndexOf(state.myCart, item.payload) === -1) {
                    state.myCart.push(item.payload);
                } else {
                    //since count is read-only we need to create a new object
                    let productInd = myIndexOf(state.myCart, item.payload);
                    let tempObj = item.payload;
                    let count = state.myCart[productInd].count;
                    state.myCart[productInd] = new Product(tempObj.id, tempObj.title, tempObj.price, tempObj.description, tempObj.category, tempObj.imageLink, count + 1, tempObj.productRatings);
                }
            },
            deleteItem: (state, index) => {
                state.myCart.splice(index.payload, 1);
            }, emptyItems: (state) => {
                state.myCart = [];
            },increaseCount: (state,item) => {
                let productInd = myIndexOf(state.myCart, item.payload);
                let tempObj = item.payload;
                let count = state.myCart[productInd].count;
                state.myCart[productInd] = new Product(tempObj.id, tempObj.title, tempObj.price, tempObj.description, tempObj.category, tempObj.imageLink, count + 1, tempObj.productRatings);
            },decreaseCount: (state,item) => {
                let productInd = myIndexOf(state.myCart, item.payload);
                if(state.myCart[productInd].count === 1) {
                    state.myCart.splice(productInd, 1);
                } else {
                    let productInd = myIndexOf(state.myCart, item.payload);
                    let tempObj = item.payload;
                    let count = state.myCart[productInd].count;
                    state.myCart[productInd] = new Product(tempObj.id, tempObj.title, tempObj.price, tempObj.description, tempObj.category, tempObj.imageLink, count - 1, tempObj.productRatings);
                }
            },
        },
    })

export const {addItem, deleteItem, emptyItems, increaseCount, decreaseCount} = cartSlice.actions;

export default cartSlice.reducer;
