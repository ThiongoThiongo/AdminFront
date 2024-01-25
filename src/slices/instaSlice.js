import {createSlice} from '@reduxjs/toolkit';

const initialState = {

    instacartInfo: localStorage.getItem('instacartInfo') ? JSON.parse(localStorage.getItem('instacartInfo')): null
}

const instaSlice = createSlice({

    name:'insta',
    initialState,
    reducers: {
        setCart: (state, action) => {
            console.log(action)
        state.instacartInfo = action.payload
        localStorage.setItem('instacartInfo', JSON.stringify(action.payload))
        }, 
        removeCart:(state, action) => {
            state.instacartInfo = null, 
            localStorage.removeItem('instacartInfo')
        } 
    }
})

export const { setCart, removeCart} = instaSlice.actions;
export default instaSlice.reducer