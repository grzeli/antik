import { ProductOwner } from '../ProductOwner/ProductOwner'

export interface Product {
  productId: string
  price: number
  currency: string
  title?: string
  description?: string
  image?: string
  imageAlt?: string
  sharesTaken?: number
  owners?: ProductOwner[]
}
