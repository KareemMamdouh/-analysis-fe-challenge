import { useTranslation } from 'react-i18next'
import './Details.scss'
import { connect } from 'react-redux'
import { useEffect, useState } from 'react'
import { IFilteredData, ILesson } from 'types/AnalysisTypes'
import { useParams, useNavigate } from 'react-router-dom'
import Setting from 'components/Setting/Setting'
import i18n from 'i18n'

interface IProps {
  filteredAnalysis?: IFilteredData[]
}
interface IState {
  country: string
  camp: string
  schoolName: string
  month: string
  NoOfLesson: number
}

export function Details({ filteredAnalysis }: IProps): JSX.Element {
  const { t } = useTranslation('', { i18n })
  const [state, setState] = useState<IState | null>(null)
  const { name, noOfLesson } = useParams()
  const navigate = useNavigate()
  useEffect(() => {
    if (filteredAnalysis && filteredAnalysis?.length > 0 && name && noOfLesson) {
      const data = filteredAnalysis.filter(x => x.schoolName === name.replace(/-/g, ' '))
      setState({
        schoolName: data[0].schoolName,
        ...data[0].lessons.filter((x: ILesson) => x.NoOfLesson === +noOfLesson)[0],
      })
    } else {
      navigate('/')
    }
  }, [filteredAnalysis, name, navigate, noOfLesson])

  return (
    <div data-testid="details-Page" className="details">
      <div className="header">
        <Setting />
      </div>

      {state && (
        <div data-testid="information-card" className="card">
          <h3>{t('More Information')}</h3>
          <p>
            {t('Country :')}
            {state.country}
          </p>
          <p>
            {t('Camp :')}
            {state.camp}
          </p>
          <p>
            {t('School Name :')}
            {state.schoolName}
          </p>
          <p>
            {t('No of lesson :')}
            {state.NoOfLesson}
          </p>
          <p>
            {t('Month :')} {state.month}
          </p>
        </div>
      )}
    </div>
  )
}
interface IStateToProps {
  AnalysisChart: { filteredAnalysis?: IFilteredData[] }
}
export const mapStateToProps = (state: IStateToProps): IProps => {
  return {
    filteredAnalysis: state.AnalysisChart.filteredAnalysis,
  }
}
const mapDispatchToProps = {}

export default connect(mapStateToProps, mapDispatchToProps)(Details)
