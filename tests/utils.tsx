import React, { PropsWithChildren } from 'react'
import { render } from '@testing-library/react'
import type { RenderOptions } from '@testing-library/react'
import { configureStore } from '@reduxjs/toolkit'
import type { PreloadedState } from '@reduxjs/toolkit'
import { Provider } from 'react-redux'

import { RootState, AppStore } from '../src/lib/core/store'
import userReducer from '../src/lib/core/store/user'
import paymentReducer from '../src/lib/core/store/payment'
import { ExampleImageSrc } from '../src/lib/statics/ExampleProductImage/ExampleProductImage'

// This type interface extends the default options for render from RTL, as well
// as allows the user to specify other things such as initialState, store.
interface ExtendedRenderOptions extends Omit<RenderOptions, 'queries'> {
  preloadedState?: PreloadedState<RootState>
  store?: AppStore
}

export function renderWithProviders(
  ui: React.ReactElement,
  {
    preloadedState = {
      payment: {
        product: {
          productId: '123456',
          price: 45.99,
          currency: '€',
          title: 'Example title',
          description: 'Example description',
          image: ExampleImageSrc,
          imageAlt: 'Example image alt',
        },
        paymentType: null,
      },
      user: {
        currentUser: '',
      },
    },
    // Automatically create a store instance if no store was passed in
    store = configureStore({ reducer: { user: userReducer, payment: paymentReducer }, preloadedState }),
    ...renderOptions
  }: ExtendedRenderOptions = {},
) {
  function Wrapper({ children }: PropsWithChildren<{}>): JSX.Element {
    return <Provider store={store}>{children}</Provider>
  }

  // Return an object with the store and all of RTL's query functions
  return { store, ...render(ui, { wrapper: Wrapper, ...renderOptions }) }
}
