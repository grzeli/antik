import * as React from 'react'
import { render } from '@testing-library/react'

import 'jest-canvas-mock'

import { Main } from '../src/lib/features/Main';

describe('Common render', () => {
  it('renders without crashing', () => {
    render(<Main />)
  })
})
