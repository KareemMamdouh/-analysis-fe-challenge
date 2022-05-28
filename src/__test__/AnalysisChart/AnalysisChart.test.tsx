import React from 'react'
import { cleanup } from '@testing-library/react'
import AnalysisChart from 'pages/AnalysisChart/AnalysisChart'
import { renderWithRedux } from '__test__/testing-utils'

jest.mock('react-chartjs-2', () => ({
  Line: () => null,
}))
afterEach(cleanup)

test('should header-title in AnalysisChart render', () => {
  const { getByTestId } = renderWithRedux(<AnalysisChart />)
  expect(getByTestId('header-title')).toHaveTextContent('Analysis chart')
})
