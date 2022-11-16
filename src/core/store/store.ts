import { configureStore } from '@reduxjs/toolkit'
import userReducer from './user'
import paymentReducer from './payment'

export const store = configureStore({
  reducer: {
    user: userReducer,
    payment: paymentReducer,
  },
})

export type AppDispatch = typeof store.dispatch
export type RootState = ReturnType<typeof store.getState>
export type AppStore = typeof store
