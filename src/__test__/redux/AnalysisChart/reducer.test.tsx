import { ActionType } from 'redux/store/actionTypes'
import reducer, { initialState } from 'redux/store/AnalysisChart/reducer'

describe('Test AnalysisChart reducer', () => {
  test('should return state with new data fot FILTERED_DATA type', () => {
    const newState = {
      ...initialState,
      filteredAnalysis: [],
    }
    const state = reducer(initialState, {
      type: ActionType.FILTERED_DATA,
      payload: [],
    })
    expect(state).toStrictEqual(newState)
  })
  test('should return state with new data fot SELECTED_SCHOOLS type', () => {
    const newState = {
      ...initialState,
      selectedSchools: [],
    }
    const state = reducer(initialState, {
      type: ActionType.SELECTED_SCHOOLS,
      payload: [],
    })
    expect(state).toStrictEqual(newState)
  })
  test('should return state with new data fot GET_ALL_COUNTRIES type', () => {
    const newState = {
      ...initialState,
      allCountries: ['Egypt'],
    }
    const state = reducer(initialState, {
      type: ActionType.GET_ALL_COUNTRIES,
      payload: ['Egypt'],
    })
    expect(state).toStrictEqual(newState)
  })
  test('should return state with new data fot GET_ALL_CAMPS type', () => {
    const newState = {
      ...initialState,
      allCamps: ['camp'],
      filterState: { ...initialState.filterState, camp: 'camp' },
    }
    const state = reducer(initialState, {
      type: ActionType.GET_ALL_CAMPS,
      payload: ['camp'],
    })
    expect(state).toStrictEqual(newState)
  })
  test('should return state with new data fot GET_ALL_SCHOOLS type', () => {
    const newState = {
      ...initialState,
      allSchools: ['SCHOOLS'],
      filterState: { ...initialState.filterState, school: 'SCHOOLS' },
    }
    const state = reducer(initialState, {
      type: ActionType.GET_ALL_SCHOOLS,
      payload: ['SCHOOLS'],
    })
    expect(state).toStrictEqual(newState)
  })
})
