import { configureStore } from '@reduxjs/toolkit'
import productReducer from './productSlice'
import userReducer from './user'
import paymentReducer from './payment'

export const store = configureStore({
  reducer: {
    product: productReducer,
    user: userReducer,
    payment: paymentReducer,
  },
})

export type AppDispatch = typeof store.dispatch
export type RootState = ReturnType<typeof store.getState>
