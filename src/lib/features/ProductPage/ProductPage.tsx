import React, { useCallback, useMemo, useState } from 'react'
import styled from 'styled-components'
import { Button } from '../../components/Button/Button'
import { PaymentTypeEnum } from '../../core/enums/PaymentTypeEnum'
import { useAppDispatch, useAppSelector } from '../../core/hooks/useRedux'
import { setPaymentProductData, setPaymentType } from '../../core/store/payment'
import { CurrentStepProps } from '../CurrentStep/CurrentStep'

interface ProductPageProps extends CurrentStepProps {
  sharesLeft?: number
}

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
  object-fit: contain;
  margin: 0 auto 16px auto;
  border-radius: 16px;
`

const Description = styled.p`
  font-size: 14px;
  line-height: 14px;
  font-family: Helvetica, sans-serif;
  color: #000;
  margin: 0 0 16px 0;
  text-align: left;
`

const Price = styled.p`
  font-size: 16px;
  font-weight: 600;
  text-align: center;
  color: #000;
  line-height: 20px;
  margin: 0 0 20px 0;
`

const Label = styled.label`
  font-size: 12px;
  font-weight: 400;
  line-height: 12px;
  font-family: Helvetica, sans-serif;
  color: #000;
  margin-bottom: 2px;
`

const SharesInput = styled.input`
  max-width: 100%;
  padding: 4px 12px;
  color: #000;
  font-weight: 400;
  font-size: 14px;
  line-height: 14px;
  background: #fff;
  border: 1px solid #a7acb1;
  border-radius: 16px;
  font-family: 'arial';
  margin: 10px 0;

  &:focus-visible {
    outline: none;
  }
`

export const ProductPage: React.FC<ProductPageProps> = (props) => {
  const { title, description, productId, image, imageAlt, price, currency, sharesLeft } = props
  const [rangeValue, setRangeValue] = useState<number>(sharesLeft ? 100 - sharesLeft : 0)
  const dispatch = useAppDispatch()
  const { product } = useAppSelector((store) => store.product)

  const rangeValueHandler = useCallback(
    (e: React.ChangeEvent<HTMLInputElement>) => {
      const value = parseInt(e.target.value)
      if (value > 100) {
        return
      }

      setRangeValue(value)
    },
    [setRangeValue],
  )

  const buyBtnOnClickHandler = useCallback(() => {
    dispatch(setPaymentType(PaymentTypeEnum.New))
    dispatch(
      setPaymentProductData({
        ...product,
        sharesTaken: rangeValue,
      }),
    )
  }, [dispatch, rangeValue, product])

  const priceOutput = useMemo(
    () =>
      price * rangeValue > 0 ? (
        <Price>
          {(price * (rangeValue / 100)).toFixed(2)} {currency}
        </Price>
      ) : null,
    [price, rangeValue, currency],
  )

  const BuyBtn = useMemo(
    () => priceOutput && <Button label='Buy' display='block' onClick={buyBtnOnClickHandler} />,
    [priceOutput, buyBtnOnClickHandler],
  )

  return (
    <Container id={productId}>
      <Title>{title || ''}</Title>
      <Image src={image} alt={imageAlt} />
      <Description>{description}</Description>
      <Label htmlFor='range'>Set shares amount:</Label>
      <input
        type='range'
        max={sharesLeft ? sharesLeft : 100}
        value={rangeValue}
        min={0}
        step='1'
        id='range'
        onChange={rangeValueHandler}
      />
      <SharesInput
        type='number'
        id='rangeNumber'
        value={rangeValue}
        min={0}
        max={sharesLeft ? sharesLeft : 100}
        step='1'
        onChange={rangeValueHandler}
      />
      {priceOutput}
      {BuyBtn}
    </Container>
  )
}
