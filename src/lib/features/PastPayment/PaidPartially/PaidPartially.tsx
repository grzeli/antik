import React, { useCallback, useMemo, useState } from 'react'
import styled from 'styled-components'
import { Button } from '../../../components/Button/Button'
import { useAppSelector } from '../../../core/hooks/useRedux'
import { ProductOwner } from '../../../core/interfaces/ProductOwner/ProductOwner'

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

export const PaidPartially: React.FC = () => {
  const { product } = useAppSelector((store) => store.payment)
  const { currentUser } = useAppSelector((store) => store.user)
  const [urlCopied, setUrlCopied] = useState<boolean>(false)

  const shareBtnHandler = useCallback(() => {
    const url = window.location.href + product.productId
    navigator.clipboard.writeText(url)
    setUrlCopied(true)
  }, [setUrlCopied, product?.productId])

  const currentUserShares = useMemo(() => {
    if (product?.owners?.length) {
      const currentOwnerData = product.owners.find((el: ProductOwner) => el.owner === currentUser)
      if (currentOwnerData) {
        return currentOwnerData.shares
      } else {
        return null
      }
    } else {
      return null
    }
  }, [product, currentUser])

  const guideText = useMemo(
    () => urlCopied && <InfoText>Send this URL to friends to share {product.title}</InfoText>,
    [urlCopied, product?.title],
  )

  return (
    <Container>
      <Title>{product.title}</Title>
      <Image src={product.image} alt={product.imageAlt} />
      <InfoText>
        Congrats! You have bought {currentUserShares}&nbsp;{product.title} shares
      </InfoText>
      <Button
        label={urlCopied ? 'URL address copied!' : 'Share'}
        margin='30px 0 0 0'
        justifyContent='center'
        onClick={shareBtnHandler}
      ></Button>
      {guideText}
    </Container>
  )
}
