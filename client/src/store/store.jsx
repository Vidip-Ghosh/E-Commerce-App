import {configureStore} from '@reduxjs/toolkit'
import cartSliceReducer from './cartSlice'

const store = configureStore({
    reducer: cartSliceReducer
})

export default store