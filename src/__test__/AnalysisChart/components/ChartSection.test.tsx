import React from 'react'
import { fireEvent, cleanup } from '@testing-library/react'
import { ChartSection } from 'pages/AnalysisChart/components/ChartSection/ChartSection'
import { renderWithRedux } from '__test__/testing-utils'

jest.mock('react-chartjs-2', () => ({
  Line: () => null,
}))

describe('Test ChartSection Page without props', () => {
  afterEach(cleanup)
  test('should chart-section in ChartSection render', () => {
    const { getByTestId } = renderWithRedux(<ChartSection />)
    expect(getByTestId('chart-section')).toBeDefined()
  })
})
describe('Test ChartSection Page with props', () => {
  afterEach(cleanup)

  test('should btn-handleClickSchool in ChartSection render and click on it to run setSelectedSchools function', async () => {
    const props = {
      filteredAnalysis: [
        {
          schoolName: 'Burke High School',
          schoolNoLessons: 1045,
          color: 'rgb(99,141,190)',
          lessons: [
            {
              month: 'Jan',
              NoOfLesson: 215,
              camp: 'Omaka',
              country: 'Egypt',
            },
            {
              month: 'Feb',
              NoOfLesson: 140,
              camp: 'Omaka',
              country: 'Egypt',
            },
          ],
        },
        {
          schoolName: 'Rapaura School',
          schoolNoLessons: 215,
          color: 'rgb(35,144,170)',
          lessons: [
            {
              month: 'Jan',
              NoOfLesson: 0,
              camp: 'Omaka',
              country: 'Egypt',
            },
            {
              month: 'Feb',
              NoOfLesson: 0,
              camp: 'Omaka',
              country: 'Egypt',
            },
          ],
        },
        {
          schoolName: 'Omaka Secondary',
          schoolNoLessons: 530,
          lessons: [],
        },
      ],
      filterState: {
        country: 'Egypt',
        camp: 'Omaka',
        school: 'show all',
      },
      selectedSchools: [
        {
          label: 'Burke High School',
          data: [215, 140, 0, 105, 0, 100, 0, 345, 0, 0, 140, 0],
          borderColor: 'rgb(99,141,190)',
          backgroundColor: '#fff',
          pointStyle: 'circle',
          pointRadius: 5,
          pointHoverRadius: 6,
        },
      ],
      setSelectedSchools: jest.fn(),
    }
    const { getAllByTestId } = renderWithRedux(<ChartSection {...props} />)
    // expect(getByTestId('btn-handleClickSchool')).toBeDefined()
    const buttons = getAllByTestId('btn-handleClickSchool')
    expect(buttons).toHaveLength(3)
    fireEvent.click(buttons[0])
    fireEvent.click(buttons[1])
    fireEvent.click(buttons[2])
    // to test delete item from selectedSchools state
    fireEvent.click(buttons[2])
    expect(props.setSelectedSchools).toBeCalledTimes(4)
  })
})
