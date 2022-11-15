import * as React from 'react'
import { render } from '@testing-library/react'

import 'jest-canvas-mock'
import { AntikCodeChallenge } from '../src/lib'

describe('Common render', () => {
  it('renders without crashing', () => {
    render(<AntikCodeChallenge productId='1' price={3} currency='€' />)
  })
})
