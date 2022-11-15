import * as React from 'react'
import { render } from '@testing-library/react'

import 'jest-canvas-mock'
import { Main } from '../src/lib'

describe('Common render', () => {
  it('renders without crashing', () => {
    render(
      <Main
        onModalClose={() => {
          console.log('test')
        }}
      />,
    )
  })
})
