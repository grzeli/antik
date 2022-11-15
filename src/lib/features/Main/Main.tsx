import React, { useEffect, useMemo, useState } from 'react'
import styled from 'styled-components'
import { Modal } from '../../components/Modal/Modal'
import { Spinner } from '../../components/Spinner/Spinner'
import { AntikCodeChallengeEnum } from '../../core/enums/AntikCodeChallengeEnum'
import { useAppDispatch } from '../../core/hooks/useRedux'
import { Product } from '../../core/interfaces/Product/Product'
import { setPaymentProductData } from '../../core/store/payment'
import { CurrentStep } from '../CurrentStep/CurrentStep'

const InfoText = styled.h3`
  font-size: 18px;
  font-family: Helvetica, sans-serif;
  font-weight: 500;
  color: #000;
  line-height: 22px;
  text-align: center;
  margin: 0 0 16px 0;
`

export interface MainProps {
  productId?: string
  price?: number
  currency?: string
  title?: string
  description?: string
  image?: string
  imageAlt?: string
  onModalClose(): void
}

export const Main: React.FC<MainProps> = (props) => {
  const { onModalClose, ...restProps } = props
  const [data, setData] = useState<Product>({ ...(restProps as Product) })
  const dispatch = useAppDispatch()

  useEffect(() => {
    const searchParam = new URLSearchParams(window.location.search)
    // checking if modal has to be initialized with provided props or has to fetch product and payment data
    if (
      searchParam?.get(AntikCodeChallengeEnum.Value) &&
      localStorage.getItem(searchParam.get(AntikCodeChallengeEnum.Value) as string) &&
      props.productId === searchParam?.get(AntikCodeChallengeEnum.Value)
    ) {
      // here I'm mocking request for getting information about current product state
      const productData: Product = JSON.parse(
        localStorage.getItem(searchParam.get(AntikCodeChallengeEnum.Value) as string) as string,
      )
      if (productData) {
        setData(productData)
        dispatch(setPaymentProductData(productData))
      }
    } else {
      dispatch(setPaymentProductData(data))
    }
  }, [])

  const output = useMemo(() => {
    if (!data?.productId || !data.price || !data.currency) {
      return (
        <Modal
          withCloseIcon
          display='flex'
          justifyContent='center'
          onClose={onModalClose}
          alignItems='center'
          flexDirection='column'
        >
          <Spinner color='#000' fontSize='50px' />
          <InfoText>
            Something went wrong. <br></br>Required data wasn`t provided. Please try again later
          </InfoText>
        </Modal>
      )
    } else {
      return <CurrentStep onModalClose={onModalClose} />
    }
  }, [data, onModalClose])

  return <>{output}</>
}
