import {createSlice} from '@reduxjs/toolkit'

const cartSlice = createSlice({
    name: 'cart',
    initialState: {
        cart: [],
    },
    reducers: {
        add(state,action){
            state.cart.push(action.payload)
        },
        remove(state,action){
            state.cart.splice(state.cart.findIndex((arrow) => arrow.id === action.payload),1);
            console.log("Removing the item from cart.")
        }
    }
})
export const {add,remove} = cartSlice.actions;
export default cartSlice.reducer;