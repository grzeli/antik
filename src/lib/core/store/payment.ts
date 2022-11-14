import { createSlice, PayloadAction } from '@reduxjs/toolkit'
import { PaymentStatus } from '../interfaces/PaymentType/PaymentType'
import { Product } from '../interfaces/Product/Product'

export interface PaymentState {
  product: Product
  paymentType: PaymentStatus | null
}

const initialState: PaymentState = { product: {}, paymentType: null }

export const paymentSlice = createSlice({
  name: 'payment',
  initialState,
  reducers: {
    setPaymentProductData: (state, action: PayloadAction<Product>) => {
      state.product = action.payload
    },
    setPaymentType: (state, action: PayloadAction<PaymentState['paymentType']>) => {
      state.paymentType = action.payload
    },
  },
})

export const { setPaymentProductData, setPaymentType } = paymentSlice.actions

export default paymentSlice.reducer
