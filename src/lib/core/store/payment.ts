import { PaymentTypeEnum } from './../enums/PaymentTypeEnum'
import { createSlice, PayloadAction } from '@reduxjs/toolkit'
import { Product } from '../interfaces/Product/Product'
import { ProductOwner } from '../interfaces/ProductOwner/ProductOwner'

export interface PaymentState {
  product: Product | null
  paymentType: PaymentTypeEnum | null
}

const initialState: PaymentState = { product: null, paymentType: null }

export const paymentSlice = createSlice({
  name: 'payment',
  initialState,
  reducers: {
    setPaymentProductData: (state, action: PayloadAction<Product | null>) => {
      state.product = action.payload
    },
    setPaymentType: (state, action: PayloadAction<PaymentState['paymentType']>) => {
      state.paymentType = action.payload
    },
    setProductOwners: (state, action: PayloadAction<ProductOwner[]>) => {
      if (state.product) {
        state.product.owners = action.payload
      }
    },
  },
})

export const { setPaymentProductData, setPaymentType, setProductOwners } = paymentSlice.actions

export default paymentSlice.reducer
