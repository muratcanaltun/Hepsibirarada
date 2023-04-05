import {createSlice} from '@reduxjs/toolkit'

const initialState = {
    myCart: []
}


export function myIndexOf(myCart, item) {
    for (let i = 0; i < myCart.length; i++) {
        if (myCart[i].id === item.id) {
            return i;
        }
    }
    return -1;
}

export function getTotal(myCart) {
    let total = 0;
    for (let i = 0; i < myCart.length; i++) {
        total = total +  myCart[i].price;
    }
    return total.toFixed(2);
}

export const cartSlice = createSlice(
    {
        name: 'cart', initialState, reducers: {
            addItem: (state, item) => {
                state.myCart.push(item.payload);
            },
            deleteItem: (state, index) => {
                state.myCart.splice(index.payload, 1);
            }, emptyItems: (state) => {
                state.myCart = [];
            },
        },
    })

export const {addItem, deleteItem, emptyItems} = cartSlice.actions;

export default cartSlice.reducer;
