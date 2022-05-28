import React from 'react'
import { cleanup, act } from '@testing-library/react'
import App from 'App'
import { renderWithRedux } from './testing-utils'

jest.mock('react-chartjs-2', () => ({
  Line: () => null,
}))

afterEach(cleanup)
test('should take a snapshot', async () => {
  const { getByTestId } = renderWithRedux(<App />)
  await act(async () => {
    expect(await getByTestId('App')).toBeDefined()
  })
})
test('test Details Route and react lazy', async () => {
  window.history.pushState(
    { name: 'Burke-High-School', noOfLesson: '345' },
    '',
    '/Details/Burke-High-School/345',
  )
  renderWithRedux(<App />)
  await act(async () => {
    expect(await window.location.pathname).toBe('/Details/Burke-High-School/345')
  })
})
// jest.mock('react-router-dom', () => ({
//   ...jest.requireActual('react-router-dom'), // use actual for all non-hook parts
//   useParams: () => ({
//     name: 'Burke-High-School',
//     noOfLesson: '345',
//   }),
//   useRouteMatch: () => ({ url: '/Details/Burke-High-School/345' }),
// }))
// jest.mock('react-router-dom', () => ({
//   useLocation: jest.fn().mockReturnValue({
//     pathname: '/Details/Burke-High-School/345',
//     search: '',
//     hash: '',
//     state: null,
//     key: '',
//   }),
// }))
// test('should take a Details', async () => {
//   const { getByTestId } = renderWithRedux(<App />)

//   await act(async () => {
//     expect(await getByTestId('App')).toBeDefined()
//   })
// })
