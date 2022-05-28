import { useTranslation } from 'react-i18next'
import './ChartSection.scss'
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend,
  ChartEvent,
  ActiveElement,
} from 'chart.js'
import { Line } from 'react-chartjs-2'
import { connect } from 'react-redux'
import { setSelectedSchools } from 'redux/store/actions'
import { RootState } from 'redux/store/index'
import { ISelectedSchools, IFilterState, ILesson, IFilteredData } from 'types/AnalysisTypes'
import { useNavigate } from 'react-router-dom'
import i18n from 'i18n'

interface IProps {
  filteredAnalysis?: IFilteredData[]
  filterState?: IFilterState
  selectedSchools?: ISelectedSchools[]
  setSelectedSchools?: (x: ISelectedSchools[]) => void
}
export function ChartSection({
  filteredAnalysis,
  filterState,
  selectedSchools,
  setSelectedSchools,
}: IProps): JSX.Element {
  const { t } = useTranslation('', { i18n })
  const navigate = useNavigate()
  ChartJS.register(CategoryScale, LinearScale, PointElement, LineElement, Title, Tooltip, Legend)
  const labels = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec']
  const options = {
    plugins: {
      legend: {
        display: false,
      },
    },
    onClick: (evt: ChartEvent, d: ActiveElement[]) => {
      if (d.length > 0 && d[0].index && selectedSchools) {
        navigate(
          `/details/${selectedSchools[d[0].datasetIndex].label.replace(/ /g, '-')}/${
            selectedSchools[d[0].datasetIndex].data[d[0].index]
          }`,
        )
      }
    },
  }

  const handleClickSchool = (x: IFilteredData): void => {
    if (setSelectedSchools && selectedSchools) {
      const isExist = selectedSchools.filter(f => f.label === x.schoolName)
      if (isExist.length > 0) {
        const newSelectedSchools = selectedSchools.filter(
          (f: ISelectedSchools): boolean => f.label !== x.schoolName,
        )
        setSelectedSchools(newSelectedSchools)
      } else {
        setSelectedSchools([
          ...selectedSchools,
          {
            label: x.schoolName,
            data:
              x?.lessons?.length > 0
                ? [
                    ...x.lessons.map((m: ILesson) => {
                      return m.NoOfLesson
                    }),
                  ]
                : [],
            borderColor: x.color ? x.color : '#fff',
            backgroundColor: '#fff',
            pointStyle: 'circle',
            pointRadius: 5,
            pointHoverRadius: 6,
          },
        ])
      }
    }
  }
  return (
    <section data-testid="chart-section" className="chart-section">
      <div className="chart">
        <p>{t('No. of lessons')}</p>
        <Line options={options} data={{ labels, datasets: selectedSchools || [] }} />
      </div>
      <div className="lessons">
        <div className="header-lessons">
          <h3>
            {filteredAnalysis &&
              filteredAnalysis.reduce((accumulator: number, object: IFilteredData) => {
                return accumulator + object.schoolNoLessons
              }, 0)}
            <span> {t('lessons')}</span>
          </h3>
          <p>
            {t('in')} {filterState?.camp}
          </p>
        </div>
        <div className="lessons-list">
          {/* {JSON.stringify(filteredAnalysis)} */}
          {handleClickSchool &&
            selectedSchools &&
            filteredAnalysis?.map((x: IFilteredData, i: number) => {
              return (
                <button
                  type="button"
                  data-testid="btn-handleClickSchool"
                  onClick={() => handleClickSchool(x)}
                  className="lesson"
                  key={`FilteredAnalysis-${i + 1}`}
                  style={{
                    color:
                      selectedSchools.filter(f => f.label === x.schoolName).length > 0
                        ? x.color
                        : 'var(--gray-color)',
                  }}>
                  <div className="lesson-point">
                    <div className="lesson-border-point">
                      <div
                        className=""
                        style={{
                          backgroundColor:
                            selectedSchools.filter(f => f.label === x.schoolName).length > 0
                              ? x.color
                              : 'var(--gray-color)',
                        }}
                      />
                    </div>
                  </div>
                  <div className="lesson-info">
                    <h3>
                      {x.schoolNoLessons}
                      <span> {t('lessons')}</span>
                    </h3>
                    <p>
                      {t('in')} {x.schoolName}
                    </p>
                  </div>
                </button>
              )
            })}
        </div>
      </div>
    </section>
  )
}
const mapStateToProps = (state: RootState): IProps => {
  return {
    filteredAnalysis: state.AnalysisChart.filteredAnalysis,
    filterState: state.AnalysisChart.filterState,
    selectedSchools: state.AnalysisChart.selectedSchools,
  }
}
const mapDispatchToProps = { setSelectedSchools }

export default connect(mapStateToProps, mapDispatchToProps)(ChartSection)
