import React from 'react'
import { cleanup, act } from '@testing-library/react'
import { Details, mapStateToProps } from 'pages/Details/Details'
import { renderWithRedux } from '__test__/testing-utils'

jest.mock('react-chartjs-2', () => ({
  Line: () => null,
}))

describe('Test Details Page without props', () => {
  afterEach(cleanup)
  test('should details-Page render', () => {
    const { getByTestId } = renderWithRedux(<Details />)
    expect(getByTestId('details-Page')).toBeDefined()
  })
})
jest.mock('react-router-dom', () => ({
  ...jest.requireActual('react-router-dom'), // use actual for all non-hook parts
  useParams: () => ({
    name: 'Burke-High-School',
    noOfLesson: '345',
  }),
  useRouteMatch: () => ({ url: '/Details/Burke-High-School/345' }),
}))
describe('Test Details Page with props', () => {
  afterEach(cleanup)
  test('should information-card render', async () => {
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
            {
              month: 'Mar',
              NoOfLesson: 0,
              camp: 'Omaka',
              country: 'Egypt',
            },
            {
              month: 'Apr',
              NoOfLesson: 105,
              camp: 'Omaka',
              country: 'Egypt',
            },
            {
              month: 'May',
              NoOfLesson: 0,
              camp: 'Omaka',
              country: 'Egypt',
            },
            {
              month: 'Jun',
              NoOfLesson: 100,
              camp: 'Omaka',
              country: 'Egypt',
            },
            {
              month: 'Jul',
              NoOfLesson: 0,
              camp: 'Omaka',
              country: 'Egypt',
            },
            {
              month: 'Aug',
              NoOfLesson: 345,
              camp: 'Omaka',
              country: 'Egypt',
            },
            {
              month: 'Sep',
              NoOfLesson: 0,
              camp: 'Omaka',
              country: 'Egypt',
            },
            {
              month: 'Oct',
              NoOfLesson: 0,
              camp: 'Omaka',
              country: 'Egypt',
            },
            {
              month: 'Nov',
              NoOfLesson: 140,
              camp: 'Omaka',
              country: 'Egypt',
            },
            {
              month: 'Dec',
              NoOfLesson: 0,
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
            {
              month: 'Mar',
              NoOfLesson: 0,
              camp: 'Omaka',
              country: 'Egypt',
            },
            {
              month: 'Apr',
              NoOfLesson: 95,
              camp: 'Omaka',
              country: 'Egypt',
            },
            {
              month: 'May',
              NoOfLesson: 0,
              camp: 'Omaka',
              country: 'Egypt',
            },
            {
              month: 'Jun',
              NoOfLesson: 0,
              camp: 'Omaka',
              country: 'Egypt',
            },
            {
              month: 'Jul',
              NoOfLesson: 0,
              camp: 'Omaka',
              country: 'Egypt',
            },
            {
              month: 'Aug',
              NoOfLesson: 15,
              camp: 'Omaka',
              country: 'Egypt',
            },
            {
              month: 'Sep',
              NoOfLesson: 30,
              camp: 'Omaka',
              country: 'Egypt',
            },
            {
              month: 'Oct',
              NoOfLesson: 0,
              camp: 'Omaka',
              country: 'Egypt',
            },
            {
              month: 'Nov',
              NoOfLesson: 75,
              camp: 'Omaka',
              country: 'Egypt',
            },
            {
              month: 'Dec',
              NoOfLesson: 0,
              camp: 'Omaka',
              country: 'Egypt',
            },
          ],
        },
      ],
    }
    const { getByTestId } = renderWithRedux(<Details {...props} />)

    await act(async () => {
      expect(await getByTestId('information-card')).toBeDefined()
    })
  })
  test('should return props from store by mapStatetoProps function', () => {
    const state = mapStateToProps({
      AnalysisChart: {
        filteredAnalysis: [],
      },
    })
    expect(state).toStrictEqual({
      filteredAnalysis: state.filteredAnalysis,
    })
  })
})
