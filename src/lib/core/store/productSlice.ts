import { createSlice, PayloadAction } from '@reduxjs/toolkit'
import { Product } from '../interfaces/Product/Product'

export interface ProductState {
  product: Product
}

const initialState: ProductState = { product: {} }

export const productSlice = createSlice({
  name: 'product',
  initialState,
  reducers: {
    updateProductData: (state, action: PayloadAction<Product>) => {
      state.product = action.payload
    },
  },
})

export const { updateProductData } = productSlice.actions

export default productSlice.reducer
