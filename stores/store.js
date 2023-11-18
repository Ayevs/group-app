import { configureStore } from '@reduxjs/toolkit'
import itemReducer from '../reducers/itemslice'

export const itemStore = configureStore({
    reducer: {
        item: itemReducer
    }
})