import { useTranslation } from 'react-i18next'
import './FilterBar.scss'
import { connect } from 'react-redux'
import {
  getAllAnalysis,
  handleChangeCountry,
  handleChangeCamp,
  handleChangeSchool,
} from 'redux/store/actions'
import { RootState } from 'redux/store/index'
import { useEffect } from 'react'
import { IFilterState, IAnalysis } from 'types/AnalysisTypes'

interface IProps {
  getAllAnalysis?: () => void
  handleChangeCountry?: (x: string) => void
  handleChangeCamp?: (x: string) => void
  handleChangeSchool?: (x: string) => void
  allAnalysis?: IAnalysis[]
  allCountries?: string[]
  allCamps?: string[]
  allSchools?: string[]
  filterState?: IFilterState
}

export function FilterBar({
  getAllAnalysis,
  handleChangeCountry,
  handleChangeCamp,
  handleChangeSchool,
  filterState,
  allAnalysis,
  allCountries,
  allCamps,
  allSchools,
}: IProps): JSX.Element {
  const { t } = useTranslation()
  useEffect(() => {
    if (getAllAnalysis && allAnalysis?.length === 0) {
      getAllAnalysis()
    }
  }, [getAllAnalysis, allAnalysis?.length])
  return (
    <div className="filter-bar">
      {handleChangeCountry && (
        <div>
          <p>{t('Select Country')}</p>
          <select
            value={filterState?.country}
            onChange={(e): void => {
              handleChangeCountry(e.target.value)
            }}>
            {allCountries?.map((x: string, i: number) => {
              return (
                <option value={x} key={`Country-${i + 1}`}>
                  {x}
                </option>
              )
            })}
          </select>
        </div>
      )}
      {handleChangeCamp && (
        <div>
          <p>{t('Select Camp')}</p>
          <select
            value={filterState?.camp}
            onChange={(e): void => {
              handleChangeCamp(e.target.value)
            }}>
            {allCamps?.map((x: string, i: number) => {
              return (
                <option value={x} key={`Country-${i + 1}`}>
                  {x}
                </option>
              )
            })}
          </select>
        </div>
      )}

      {handleChangeSchool && (
        <div>
          <p>{t('Select School')}</p>
          <select
            value={filterState?.school}
            onChange={(e): void => {
              handleChangeSchool(e.target.value)
            }}>
            {allSchools?.map((x: string, i: number) => {
              return (
                <option value={x} key={`Country-${i + 1}`}>
                  {x}
                </option>
              )
            })}
          </select>
        </div>
      )}
    </div>
  )
}
const mapStateToProps = (state: RootState): IProps => {
  return {
    allAnalysis: state.AnalysisChart.allAnalysis,
    allCountries: state.AnalysisChart.allCountries,
    allCamps: state.AnalysisChart.allCamps,
    allSchools: state.AnalysisChart.allSchools,
    filterState: state.AnalysisChart.filterState,
  }
}
const mapDispatchToProps = { getAllAnalysis, handleChangeCountry, handleChangeCamp, handleChangeSchool }

export default connect(mapStateToProps, mapDispatchToProps)(FilterBar)
