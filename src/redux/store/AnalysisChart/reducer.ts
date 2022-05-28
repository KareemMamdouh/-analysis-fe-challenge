import { ActionType } from 'redux/store/actionTypes'
import { IState, ActionTypes } from 'types/AnalysisTypes'

export const initialState = {
  allAnalysis: [],
  filteredAnalysis: [],
  allCountries: [],
  allCamps: [],
  allSchools: [],
  selectedSchools: [],
  filterState: { country: '', camp: '', school: '' },
}

const reducer = (state: IState = initialState, action: ActionTypes): IState => {
  switch (action.type) {
    case ActionType.GET_ALL_ANALYSIS:
      return {
        ...state,
        allAnalysis: action.payload,
      }
    case ActionType.FILTERED_DATA:
      return {
        ...state,
        filteredAnalysis: action.payload,
      }
    case ActionType.GET_ALL_COUNTRIES:
      return {
        ...state,
        allCountries: action.payload,
        // filterState: { ...state.filterState, country: action.payload[0] },
      }
    case ActionType.GET_ALL_CAMPS:
      return {
        ...state,
        allCamps: action.payload,
        filterState: { ...state.filterState, camp: action.payload[0] },
      }
    case ActionType.GET_ALL_SCHOOLS:
      return {
        ...state,
        allSchools: action.payload,
        filterState: { ...state.filterState, school: action.payload[0] },
      }
    case ActionType.FILTER_STATE:
      return {
        ...state,
        filterState: action.payload,
      }
    case ActionType.SELECTED_SCHOOLS:
      return {
        ...state,
        selectedSchools: action.payload,
      }

    default:
      return { ...state }
  }
}

export default reducer
