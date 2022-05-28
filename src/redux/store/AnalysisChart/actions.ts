import { ActionType } from 'redux/store/actionTypes'
import { store } from 'redux/store/index'
import axios from 'axios'
import { Action, IAnalysis, ILesson, ISelectedSchools } from 'types/AnalysisTypes'

interface IGroupByIAnalysis {
  [key: string]: IAnalysis[]
}

export const handleChangeSchool = (selected: string) => {
  return (dispatch: Action) => {
    const state = store.getState()
    dispatch({
      type: ActionType.FILTER_STATE,
      payload: { ...state.AnalysisChart.filterState, school: selected },
    })
    const groupBy = (objectArray: IAnalysis[], property: 'school'): IGroupByIAnalysis => {
      return objectArray.reduce((acc: IGroupByIAnalysis, obj: IAnalysis) => {
        const key = obj[property]
        if (!acc[key]) {
          acc[key] = []
        }
        acc[key].push(obj)
        return acc
      }, {})
    }
    const dynamicColors = (): string => {
      const r = Math.floor(Math.random() * 255)
      const g = Math.floor(Math.random() * 255)
      const b = Math.floor(Math.random() * 255)
      return `rgb(${r},${g},${b})`
    }
    let allSchools = state.AnalysisChart.allAnalysis.filter(
      (x: IAnalysis) =>
        x.country === state.AnalysisChart.filterState.country &&
        x.camp === state.AnalysisChart.filterState.camp,
    )
    if (selected !== 'show all') {
      allSchools = allSchools.filter((x: IAnalysis) => x.school === selected)
    }
    const months = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec']
    const groupBySchools = groupBy(allSchools, 'school')
    const arraySchools = Object.keys(groupBySchools).map(key => {
      const lessonsMonthly = []
      for (let index = 0; index < months.length; index++) {
        const monthExist = groupBySchools[key].filter((x: IAnalysis) => x.month === months[index])
        // console.log(key, monthExist, ':monthIndex')
        const NoOfLesson =
          monthExist.length > 0
            ? monthExist.reduce((accumulator: number, object: IAnalysis) => {
                return accumulator + object.lessons
              }, 0)
            : 0
        lessonsMonthly[index] = {
          month: months[index],
          NoOfLesson,
          camp: groupBySchools[key][0].camp,
          country: groupBySchools[key][0].country,
        }
      }
      return {
        schoolName: key,
        schoolNoLessons: lessonsMonthly.reduce((accumulator: number, object: ILesson) => {
          return accumulator + object.NoOfLesson
        }, 0),
        color: dynamicColors(),
        lessons: lessonsMonthly,
      }
    })
    dispatch({
      type: ActionType.FILTERED_DATA,
      payload: arraySchools,
    })
    dispatch({
      type: ActionType.SELECTED_SCHOOLS,
      payload:
        arraySchools.length > 0
          ? [
              {
                label: arraySchools[0]?.schoolName,
                data: [
                  ...arraySchools[0].lessons.map((x: ILesson) => {
                    return x.NoOfLesson
                  }),
                ],
                borderColor: arraySchools[0].color,
                backgroundColor: '#fff',
                pointStyle: 'circle',
                pointRadius: 5,
                pointHoverRadius: 6,
              },
            ]
          : [],
    })
  }
}
export const handleChangeCamp = (selected: string) => {
  return (dispatch: Action) => {
    const state = store.getState()
    dispatch({
      type: ActionType.FILTER_STATE,
      payload: { ...state.AnalysisChart.filterState, camp: selected },
    })
    const schools = Array.from(
      new Set([
        'show all',
        ...state.AnalysisChart.allAnalysis
          .filter(f => f.country === state.AnalysisChart.filterState.country && f.camp === selected)
          .map((x: IAnalysis) => {
            return x.school
          }),
      ]),
    )
    dispatch({
      type: ActionType.GET_ALL_SCHOOLS,
      payload: schools,
    })
    dispatch(handleChangeSchool(schools[0]))
  }
}

export const handleChangeCountry = (selected: string) => {
  return (dispatch: Action) => {
    const state = store.getState()
    dispatch({
      type: ActionType.FILTER_STATE,
      payload: { ...state.AnalysisChart.filterState, country: selected },
    })
    const camp = Array.from(
      new Set([
        ...state.AnalysisChart.allAnalysis
          .filter(f => f.country === selected)
          .map((x: IAnalysis) => {
            return x.camp
          }),
      ]),
    )
    dispatch({
      type: ActionType.GET_ALL_CAMPS,
      payload: camp,
    })
    dispatch(handleChangeCamp(camp[0]))
  }
}
export const getAllAnalysis = () => {
  return (dispatch: Action) => {
    axios
      .get(`https://raw.githubusercontent.com/abdelrhman-arnos/analysis-fe-challenge/master/data.json`, {})
      .then(res => {
        dispatch({
          type: ActionType.GET_ALL_ANALYSIS,
          payload: res.data,
        })
        const countries = Array.from(
          new Set([
            ...res.data.map((x: IAnalysis) => {
              return x.country
            }),
          ]),
        )
        dispatch({
          type: ActionType.GET_ALL_COUNTRIES,
          payload: countries,
        })
        dispatch(handleChangeCountry(countries[0]))
      })
      .catch(() => {
        // console.log(error, 'error')
      })
  }
}
export const setSelectedSchools = (schools: ISelectedSchools[]) => {
  return (dispatch: Action) => {
    dispatch({
      type: ActionType.SELECTED_SCHOOLS,
      payload: schools,
    })
  }
}
