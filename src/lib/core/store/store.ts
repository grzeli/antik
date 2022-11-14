import { configureStore } from '@reduxjs/toolkit'
import productReducer from './productSlice'
import userReducer from './user'

export const store = configureStore({
  reducer: {
    product: productReducer,
    user: userReducer,
  },
})

export type AppDispatch = typeof store.dispatch
export type RootState = ReturnType<typeof store.getState>
