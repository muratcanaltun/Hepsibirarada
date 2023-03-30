import {createSlice} from '@reduxjs/toolkit'

const initialState = {
    open: false
}

export const drawerSlice = createSlice({
    name: 'drawer', initialState, reducers: {
        setOpen: (state, open) => {
            state.open = open.payload;
        },
    },
})

export const {setOpen} = drawerSlice.actions;

export default drawerSlice.reducer