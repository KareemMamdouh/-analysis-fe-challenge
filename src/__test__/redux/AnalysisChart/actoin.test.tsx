import { cleanup } from '@testing-library/react'
import { RootState, store } from 'redux/store/index'
import { ActionType } from 'redux/store/actionTypes'
import {
  handleChangeSchool,
  handleChangeCamp,
  handleChangeCountry,
  getAllAnalysis,
  setSelectedSchools,
} from 'redux/store/AnalysisChart/actions'
import thunk, { ThunkDispatch } from 'redux-thunk'
import { AnyAction } from 'redux'
import configureStore from 'redux-mock-store'
import axios from 'axios'

// jest.mock('node-fetch', () => jest.fn())
jest.mock('axios')
const mockedAxios = axios as jest.Mocked<typeof axios>

const initialState = {
  AnalysisChart: {
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
      {
        id: '620af3a47c41df4c2f41bc4d',
        month: 'Sep',
        camp: 'Kakuma',
        country: 'Tunisia',
        school: 'Jolie Boarding School',
        lessons: 200,
      },
    ],
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
    ],
    allCountries: [],
    allCamps: [],
    allSchools: [],
    selectedSchools: [],
    filterState: {
      country: '',
      camp: '',
      school: '',
    },
  },
}
type State = RootState
const middlewares = [thunk]
const mockStoreConfigure = configureStore<State, ThunkDispatch<State, undefined, AnyAction>>(middlewares)
const mockStore = mockStoreConfigure(initialState)
describe('Test AnalysisChart actions', () => {
  afterEach(cleanup)
  afterEach(() => {
    mockStore.clearActions()
  })

  test('Test AnalysisChart actions getAllAnalysis with status 200', async () => {
    const requestData = initialState.AnalysisChart.allAnalysis
    await mockedAxios.get.mockResolvedValue({
      data: requestData,
    })
    await mockStore.dispatch(getAllAnalysis())
  })
  test('Test AnalysisChart actions getAllAnalysis with status 400', async () => {
    const requestData = initialState.AnalysisChart.allAnalysis
    await mockedAxios.get.mockRejectedValue({
      data: requestData,
    })
    await mockStore.dispatch(getAllAnalysis())
    expect(mockedAxios.get).toBeCalled()
  })

  test('Test AnalysisChart actions handleChangeCountry', async () => {
    await store.dispatch({
      type: ActionType.GET_ALL_ANALYSIS,
      payload: initialState.AnalysisChart.allAnalysis,
    })
    await mockStore.dispatch(handleChangeCountry('Egypt'))
    expect(mockStore.getActions().length).toBe(7)
  })

  test('Test AnalysisChart actions handleChangeCamp ', async () => {
    await store.dispatch({
      type: ActionType.GET_ALL_ANALYSIS,
      payload: initialState.AnalysisChart.allAnalysis,
    })
    await store.dispatch({
      type: ActionType.FILTER_STATE,
      payload: {
        country: 'Egypt',
        camp: '',
        school: '',
      },
    })
    await mockStore.dispatch(handleChangeCamp('Omaka'))
    expect(mockStore.getActions().length).toBe(5)
  })

  test('Test AnalysisChart actions handleChangeSchool  ', async () => {
    await store.dispatch({
      type: ActionType.GET_ALL_ANALYSIS,
      payload: initialState.AnalysisChart.allAnalysis,
    })
    await store.dispatch({
      type: ActionType.FILTER_STATE,
      payload: {
        country: 'Egypt',
        camp: 'Omaka',
        school: '',
      },
    })
    await mockStore.dispatch(handleChangeSchool('show all'))
    await mockStore.dispatch(handleChangeSchool('Burke High School'))
    expect(mockStore.getActions().length).toBe(6)
  })
  test('Test AnalysisChart actions setSelectedSchools', async () => {
    await mockStore.dispatch(
      setSelectedSchools([
        {
          label: 'Burke High School',
          data: [215, 140, 0, 105, 0, 100, 0, 345, 0, 0, 140, 0],
          borderColor: 'rgb(99,141,190)',
          backgroundColor: '#fff',
          pointStyle: 'circle',
          pointRadius: 5,
          pointHoverRadius: 6,
        },
      ]),
    )
    expect(mockStore.getActions()).toEqual([
      {
        type: ActionType.SELECTED_SCHOOLS,
        payload: [
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
      },
    ])
  })
})
