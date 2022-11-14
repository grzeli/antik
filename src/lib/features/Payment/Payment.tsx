import React, { useCallback, useMemo, useState } from 'react'
import styled from 'styled-components'
import { Button } from '../../components/Button/Button'
import { Spinner } from '../../components/Spinner/Spinner'
import { PaymentTypeEnum } from '../../core/enums/PaymentTypeEnum'
import { useAppDispatch, useAppSelector } from '../../core/hooks/useRedux'
import { Product } from '../../core/interfaces/Product/Product'
import { ProductOwner } from '../../core/interfaces/ProductOwner/ProductOwner'
import { setPaymentType, setProductOwners } from '../../core/store/payment'

const Title = styled.h3`
  font-size: 12px;
  font-family: Helvetica, sans-serif;
  font-weight: 600;
  color: #000;
  line-height: 14px;
  text-align: center;
  margin: 8px 0;

  &:nth-of-type(1) {
    margin-top: 0;
  }
`

const Image = styled.img`
  max-width: 100%;
  max-height: 100px;
  object-fit: contain;
  margin: 0 auto;
  border-radius: 16px;
`

const Container = styled.div`
  display: flex;
  flex-flow: column nowrap;
`

const InfoText = styled.p`
  font-size: 16px;
  line-height: 18px;
  font-weight: 400;
  font-family: Helvetica, sans-serif;
  color: #000;
  margin: 6px 0 12px 0;
`

const FormElementContainer = styled.div`
  display: flex;
  flex-flow: row nowrap;
  align-items: center;
  margin-bottom: 6px;
`

const Label = styled.label`
  font-size: 16px;
  font-weight: 400;
  line-height: 20px;
  margin: 0;
  color: #000;
  cursor: pointer;
`

const RadioInput = styled.input`
  margin: 0 4px 0 0;
`

const SharesAmount = styled.div<Pick<Product, 'sharesTaken'>>`
  width: 100%;
  display: block;
  position: relative;
  border-radius: 3px;
  height: 6px;
  background: gray;
  margin-bottom: 20px;

  &::after {
    content: '';
    display: block;
    position: absolute;
    left: 0;
    top: 0;
    bottom: 0;
    width: ${({ sharesTaken }) => sharesTaken + '%'};
    background: rgb(46, 34, 219);
    border-radius: 3px;
  }
`

enum PaymentMethod {
  Visa = 'visa',
  MasterCard = 'mastercard',
}

export const Payment: React.FC = () => {
  const { product } = useAppSelector((store) => store.payment)
  const { currentUser } = useAppSelector((store) => store.user)
  const [selectedPaymentMethod, setPaymentMethod] = useState<PaymentMethod | null>(null)
  const [isLoading, setIsLoading] = useState<boolean>(false)
  const [error, setError] = useState<string>('')
  const dispatch = useAppDispatch()

  const onPaymentMethodSelect = useCallback(
    (data: PaymentMethod) => () => {
      setPaymentMethod(data)
    },
    [setPaymentMethod],
  )

  const mockedPaymentRequest = useCallback(
    (requestObject: Product) => {
      setTimeout(() => {
        try {
          localStorage.setItem(product.productId as string, JSON.stringify(requestObject))
          // BE is performing payment process and it's returning response with current Object data
          // we need here to get information about left shares of the Object to determine what has to happen next
          const requestResponse: Product = JSON.parse(localStorage.getItem(product.productId as string) as string)
          if (!requestResponse.owners?.length) {
            return
          }
          const sharesTaken = requestResponse.owners.reduce((acc: number, curr: ProductOwner) => acc + curr.shares, 0)
          if (sharesTaken !== 100) {
            dispatch(setPaymentType(PaymentTypeEnum.PaidPartially))
          } else {
            dispatch(setPaymentType(PaymentTypeEnum.Paid))
          }
          dispatch(setProductOwners(requestResponse.owners))
          setIsLoading(false)
        } catch (err) {
          setError(err as string)
        }
      }, 1000)
    },
    [product?.productId, dispatch],
  )

  const onPayment = useCallback(() => {
    const requestObject: Product = {
      ...product,
      owners: [
        {
          owner: currentUser,
          shares: product.sharesTaken as number,
        },
      ],
    }
    setIsLoading(true)
    mockedPaymentRequest(requestObject)
  }, [currentUser, product, mockedPaymentRequest])

  const errorOutput = useMemo(() => error.length && 'something went wrong, please try again', [error])

  const payBtn = useMemo(
    () =>
      selectedPaymentMethod && (
        <Button
          label='Pay'
          display='flex'
          margin='20px 0 0 0'
          onClick={onPayment}
          justifyContent='center'
          disabled={isLoading}
        >
          {isLoading && <Spinner />}
        </Button>
      ),
    [selectedPaymentMethod, onPayment, isLoading],
  )

  const sharesOutput = useMemo(
    () => (
      <Title>
        Shares amount: {product.sharesTaken}% =&nbsp;
        {((product.price as number) * ((product.sharesTaken as number) / 100)).toFixed(2)}
        {product.currency}
      </Title>
    ),
    [product.sharesTaken, product.price, product.currency],
  )

  const radioButtons = useMemo(
    () =>
      !errorOutput && (
        <>
          <FormElementContainer>
            <RadioInput
              type='radio'
              value={PaymentMethod.Visa}
              id='visa'
              checked={selectedPaymentMethod === PaymentMethod.Visa}
              onChange={onPaymentMethodSelect(PaymentMethod.Visa)}
            />
            <Label htmlFor='visa'>Visa</Label>
          </FormElementContainer>
          <FormElementContainer>
            <RadioInput
              type='radio'
              value={PaymentMethod.MasterCard}
              id='mastercard'
              checked={selectedPaymentMethod === PaymentMethod.MasterCard}
              onChange={onPaymentMethodSelect(PaymentMethod.MasterCard)}
            />
            <Label htmlFor='mastercard'>Mastercard</Label>
          </FormElementContainer>
        </>
      ),
    [onPaymentMethodSelect, selectedPaymentMethod, errorOutput],
  )

  return (
    <Container>
      <Title>{product.title}</Title>
      <Image src={product.image} alt={product.imageAlt} />
      {sharesOutput}
      <SharesAmount sharesTaken={product.sharesTaken} />
      <InfoText>Select payment method:</InfoText>
      {radioButtons}
      {payBtn}
    </Container>
  )
}
