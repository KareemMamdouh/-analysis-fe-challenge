import { ActionType } from 'redux/store/actionTypes'

export interface IAnalysis {
  id: string
  month: string
  camp: string
  country: string
  school: string
  lessons: number
}
export interface IAllAnalysis {
  allAnalysis: IAnalysis[]
}

export interface IState {
  allAnalysis: IAnalysis[]
  filteredAnalysis: IFilteredData[]
  allCountries: string[]
  allCamps: string[]
  allSchools: string[]
  filterState: IFilterState
  selectedSchools: ISelectedSchools[]
}
export interface IFilterState {
  country?: string
  camp?: string
  school?: string
}
export interface ILesson {
  month: string
  NoOfLesson: number
  camp: string
  country: string
}
export interface IFilteredData {
  schoolName: string
  color: string
  schoolNoLessons: number
  lessons: ILesson[]
}
export interface ISelectedSchools {
  label: string
  data: number[]
  borderColor: string
  backgroundColor: '#fff'
  pointStyle: 'circle'
  pointRadius: 5
  pointHoverRadius: 6
}

export interface IActionGetAllAnalysis {
  type: ActionType.GET_ALL_ANALYSIS
  payload: IAnalysis[]
}
export interface IActionGetAllCountries {
  type: ActionType.GET_ALL_COUNTRIES
  payload: string[]
}
export interface IActionGetAllCamps {
  type: ActionType.GET_ALL_CAMPS
  payload: string[]
}
export interface IActionGetAllSchools {
  type: ActionType.GET_ALL_SCHOOLS
  payload: string[]
}
export interface IActionFilteredData {
  type: ActionType.FILTERED_DATA
  payload: IFilteredData[]
}
export interface IActionFilterState {
  type: ActionType.FILTER_STATE
  payload: IFilterState
}
export interface IActionSelectedSchools {
  type: ActionType.SELECTED_SCHOOLS
  payload: ISelectedSchools[]
}

export type Action =
  | IActionGetAllAnalysis
  | IActionGetAllCountries
  | IActionGetAllCamps
  | IActionGetAllSchools
  | IActionFilteredData
  | IActionFilterState
  | IActionSelectedSchools
