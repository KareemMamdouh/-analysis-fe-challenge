import React from 'react'
import { fireEvent, cleanup } from '@testing-library/react'
import { FilterBar } from 'pages/AnalysisChart/components/FilterBar/FilterBar'
import { renderWithRedux } from '__test__/testing-utils'

jest.mock('react-chartjs-2', () => ({
  Line: () => null,
}))

describe('Test FilterBar Page without props', () => {
  afterEach(cleanup)
  test('should filter-bar in FilterBar render', () => {
    const { getByTestId } = renderWithRedux(<FilterBar />)
    expect(getByTestId('filter-bar')).toBeDefined()
  })
})
describe('Test FilterBar Page with props', () => {
  afterEach(cleanup)
  const props = {
    getAllAnalysis: jest.fn(),
    handleChangeCountry: jest.fn(),
    handleChangeCamp: jest.fn(),
    handleChangeSchool: jest.fn(),
    allAnalysis: [
      {
        id: '620af3a468e4b2e765e7c9e7',
        month: 'Feb',
        camp: 'Omaka',
        country: 'Egypt',
        school: 'Burke High School',
        lessons: 140,
      },
      {
        id: '620af3a4b8c8ca0afd385a9c',
        month: 'Apr',
        camp: 'Kakuma',
        country: 'Egypt',
        school: 'Kakuma Secondary',
        lessons: 170,
      },
    ],
    allCountries: ['Egypt', 'Tunisia', 'Tanzania', 'Kenya'],
    allCamps: ['Omaka', 'Kakuma', 'Lemaci', 'Sebuna'],
    allSchools: [
      'show all',
      'Burke High School',
      'Rapaura School',
      'Omaka Secondary',
      'Te Kupenga Preschool',
    ],
    filterState: {
      country: 'Egypt',
      camp: 'Omaka',
      school: 'show all',
    },
  }
  test('test all select and change the value', async () => {
    const { getByTestId } = renderWithRedux(<FilterBar {...props} />)
    fireEvent.change(getByTestId('select-country'), { target: { value: 'Egypt' } })
    fireEvent.change(getByTestId('select-camp'), { target: { value: 'Omaka' } })
    fireEvent.change(getByTestId('select-school'), { target: { value: 'show all' } })
    expect(getByTestId('select-country')).toHaveTextContent('Egypt')
    expect(getByTestId('select-camp')).toHaveTextContent('Omaka')
    expect(getByTestId('select-school')).toHaveTextContent('show all')
  })
})
