import React, { useCallback } from 'react'
import styled from 'styled-components'
import { Button } from '../../../components/Button/Button'
import { useAppSelector } from '../../../core/hooks/useRedux'
import { prepareAndDownloadFile } from '../../../core/utils/utils'

const Container = styled.div`
  display: flex;
  flex-flow: column nowrap;
`

const Title = styled.h3`
  font-size: 18px;
  font-family: Helvetica, sans-serif;
  font-weight: 500;
  color: #000;
  line-height: 22px;
  text-align: center;
  margin: 0 0 16px 0;
`

const Image = styled.img`
  max-width: 100%;
  max-height: 140px;
  object-fit: contain;
  margin: 0 auto 16px auto;
  border-radius: 16px;
`

const InfoText = styled.p`
  margin: 20px 0 0 0;
  font-size: 14px;
  font-weight: 400;
  color: #000;
  line-height: 16px;
  font-family: Helvetica, sans-serif;
`

export const FullyPaid: React.FC = () => {
  const { product } = useAppSelector((store) => store.payment)

  const downloadCert = useCallback(() => {
    prepareAndDownloadFile(product)
  }, [product])

  return (
    <Container>
      <Title>{product.title}</Title>
      <Image src={product.image} alt={product.imageAlt} />
      <InfoText>Congrats! {product.title} is fully paid</InfoText>
      <Button label='Download cert' margin='30px 0 0 0' justifyContent='center' onClick={downloadCert}></Button>
    </Container>
  )
}
