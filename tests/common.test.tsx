import * as React from 'react'
import { fireEvent, render, screen } from '@testing-library/react'
import '@testing-library/jest-dom'

import 'jest-canvas-mock'
import { AntikCodeChallenge, Authorization, CurrentStep, Main, PastPayment, Payment, ProductPage } from '../src'
import { renderWithProviders } from './utils'
import { store } from '../src/core/store'
import { PaymentTypeEnum } from '../src/core/enums/PaymentTypeEnum'

const productMock = {
  productId: '123456',
  price: 45.99,
  currency: '€',
  title: 'Example title',
  description: 'Example description',
  imageAlt: 'Example image alt',
}

describe('Common render', () => {
  it('renders without crashing', () => {
    render(<AntikCodeChallenge productId='1' price={3} currency='€' defaultButtonProps={{ label: 'Buy product' }} />)

    const button = screen.getByRole('button')
    expect(button).toBeInTheDocument()
    expect(button).toHaveTextContent('Buy product')
  })
})

describe('Authorization component test', () => {
  beforeEach(() => {
    renderWithProviders(<Authorization />)
  })

  it('renders without crashing', () => {
    screen.debug()
  })

  it('logging in', () => {
    const state = store.getState().user
    expect(state).toEqual({ currentUser: '' })
    const input = screen.getByRole('textbox', { name: 'Email address' })
    expect(input).toBeInTheDocument()
    const passwordInput = screen.getByLabelText('Password', { selector: 'input' })
    expect(passwordInput).toBeInTheDocument()
    const button = screen.getByRole('button')
    expect(button).toBeInTheDocument()
    fireEvent.change(input, { target: { value: 'user@gmail.com' } })
    fireEvent.change(passwordInput, { target: { value: '123456' } })
    fireEvent.click(button)
    expect(button).toBeDisabled()
  })
})

describe('CurrentStep component test', () => {
  it('renders without crashing', () => {
    renderWithProviders(
      <CurrentStep
        onModalClose={() => {
          console.log('')
        }}
      />,
    )
  })

  it('renders authorization component', () => {
    const { getByTestId, container } = renderWithProviders(
      <CurrentStep
        onModalClose={() => {
          console.log('')
        }}
      />,
    )
    const currentStep = getByTestId('CurrentStep')
    expect(currentStep).toBeInTheDocument()
    expect(container.querySelector('#email')).toBeInTheDocument()
  })

  it('renders product component', () => {
    const { getByTestId } = renderWithProviders(
      <CurrentStep
        onModalClose={() => {
          console.log('')
        }}
      />,
      {
        preloadedState: {
          payment: {
            product: productMock,
            paymentType: null,
          },
          user: {
            currentUser: 'user@gmail.com',
          },
        },
      },
    )

    const currentStep = getByTestId('CurrentStep')
    expect(currentStep).toBeInTheDocument()
    expect(getByTestId('ProductPage')).toBeInTheDocument()
  })

  it('renders payment component', () => {
    const { getByTestId } = renderWithProviders(
      <CurrentStep
        onModalClose={() => {
          console.log('')
        }}
      />,
      {
        preloadedState: {
          payment: {
            product: productMock,
            paymentType: PaymentTypeEnum.New,
          },
          user: {
            currentUser: 'user@gmail.com',
          },
        },
      },
    )

    const currentStep = getByTestId('CurrentStep')
    expect(currentStep).toBeInTheDocument()
    expect(getByTestId('Payment')).toBeInTheDocument()
  })

  it('renders postPayment - FullyPaid component', () => {
    const { getByTestId } = renderWithProviders(
      <CurrentStep
        onModalClose={() => {
          console.log('')
        }}
      />,
      {
        preloadedState: {
          payment: {
            product: { ...productMock, sharesTaken: 100 },
            paymentType: PaymentTypeEnum.Paid,
          },
          user: {
            currentUser: 'user@gmail.com',
          },
        },
      },
    )

    const currentStep = getByTestId('CurrentStep')
    expect(currentStep).toBeInTheDocument()
    expect(getByTestId('FullyPaid')).toBeInTheDocument()
  })

  it('renders postPayment - PaidPartially component', () => {
    const { getByTestId } = renderWithProviders(
      <CurrentStep
        onModalClose={() => {
          console.log('')
        }}
      />,
      {
        preloadedState: {
          payment: {
            product: { ...productMock, sharesTaken: 10 },
            paymentType: PaymentTypeEnum.PaidPartially,
          },
          user: {
            currentUser: 'user@gmail.com',
          },
        },
      },
    )

    const currentStep = getByTestId('CurrentStep')
    expect(currentStep).toBeInTheDocument()
    expect(getByTestId('PaidPartially')).toBeInTheDocument()
  })

  it('renders loader if data wasn"t provided', () => {
    const { getByTestId } = renderWithProviders(
      <CurrentStep
        onModalClose={() => {
          console.log('')
        }}
      />,
      {
        preloadedState: {
          payment: {
            product: null,
            paymentType: null,
          },
          user: {
            currentUser: 'user@gmail.com',
          },
        },
      },
    )

    expect(getByTestId('spinner')).toBeInTheDocument()
  })
})

describe('Main component test', () => {
  it('renders without crashing', () => {
    renderWithProviders(
      <Main
        onModalClose={() => {
          console.log('')
        }}
      />,
    )
  })

  it('logic works properly', () => {
    const { getByTestId } = renderWithProviders(
      <Main
        onModalClose={() => {
          console.log('')
        }}
        productId='1'
        price={3}
        currency='€'
      />,
    )
    const currentStep = getByTestId('CurrentStep')
    expect(currentStep).toBeInTheDocument()
  })

  it('shows spinner if data wasn"t provided', () => {
    const { getByTestId } = renderWithProviders(
      <Main
        onModalClose={() => {
          console.log('')
        }}
      />,
    )
    expect(getByTestId('spinner')).toBeInTheDocument()
  })
})

describe('PastPayment component test', () => {
  it('renders without crashing', () => {
    renderWithProviders(<PastPayment />)
  })
})

describe('Payment component test', () => {
  it('renders without crashing', () => {
    renderWithProviders(<Payment />)
  })

  it('renders properly', () => {
    const { getByTestId, getAllByRole, getByText } = renderWithProviders(<Payment />, {
      preloadedState: {
        payment: {
          product: { ...productMock, sharesTaken: 10 },
          paymentType: PaymentTypeEnum.PaidPartially,
        },
        user: {
          currentUser: 'user@gmail.com',
        },
      },
    })

    expect(getByTestId('Payment')).toBeInTheDocument()
    expect(getAllByRole('radio')).toHaveLength(2)
    expect(getByText('Example title')).toBeInTheDocument()
  })
})

describe('ProductPage component test', () => {
  it('renders without crashing', () => {
    renderWithProviders(<ProductPage productId='1' price={3} currency='€' />)
  })

  it('renders properly', () => {
    const { getByText } = renderWithProviders(<ProductPage productId='1' title='title' price={3} currency='€' />)
    expect(getByText('title')).toBeInTheDocument()
  })
})
