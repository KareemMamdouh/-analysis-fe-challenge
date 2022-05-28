import React from 'react'
import { fireEvent, cleanup } from '@testing-library/react'
import Setting from 'components/Setting/Setting'
import { renderWithRedux } from '__test__/testing-utils'

jest.mock('react-chartjs-2', () => ({
  Line: () => null,
}))

describe('Test Setting component', () => {
  afterEach(cleanup)
  test('should select-section in Setting render', () => {
    const { getByTestId } = renderWithRedux(<Setting />)
    expect(getByTestId('select-section')).toBeDefined()
  })
  test('test default value in localStorage and test all select and change the value and', () => {
    localStorage.setItem('Lang', 'en')
    localStorage.setItem('Mode', 'Light')
    const { getByTestId } = renderWithRedux(<Setting />)
    expect(getByTestId('handle-mode')).toHaveTextContent('Light')
    expect(getByTestId('handle-lang')).toHaveTextContent('en')
    fireEvent.change(getByTestId('handle-mode'), { target: { value: 'Dark' } })
    fireEvent.change(getByTestId('handle-lang'), { target: { value: 'en' } })
    expect(getByTestId('handle-mode')).toHaveTextContent('Dark')
    expect(getByTestId('handle-lang')).toHaveTextContent('en')
    fireEvent.change(getByTestId('handle-lang'), { target: { value: 'fr' } })
  })
})
