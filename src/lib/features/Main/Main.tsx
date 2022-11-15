import React, { useEffect, useMemo, useState } from 'react'
import { Provider } from 'react-redux'
import styled from 'styled-components'
import { Modal } from '../../components/Modal/Modal'
import { Spinner } from '../../components/Spinner/Spinner'
import { AntikCodeChallenge } from '../../core/enums/AntikCodeChallengeEnum'
import { Product } from '../../core/interfaces/Product/Product'
import { store } from '../../core/store'
import { CurrentStep, CurrentStepProps } from '../CurrentStep/CurrentStep'

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
  const { onModalClose } = props
  const [data, setData] = useState<Product>({ ...props })

  useEffect(() => {
    const searchParam = new URLSearchParams(window.location.search)
    // checking if modal has to be initialized with provided props or has to fetch product and payment data
    if (
      searchParam?.get(AntikCodeChallenge.Value) &&
      localStorage.getItem(searchParam.get(AntikCodeChallenge.Value) as string)
    ) {
      // here I'm mocking request for getting information about current product state
      const productData: Product = JSON.parse(
        localStorage.getItem(searchParam.get(AntikCodeChallenge.Value) as string) as string,
      )
      if (productData) {
        setData(productData)
      }
    }
  }, [])

  const output = useMemo(() => {
    if (Object.keys(data) && Object.keys(data).length > 1) {
      return <CurrentStep {...(data as CurrentStepProps)} onModalClose={onModalClose} />
    } else {
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
    }
  }, [data, onModalClose])

  return <Provider store={store}>{output}</Provider>
}
