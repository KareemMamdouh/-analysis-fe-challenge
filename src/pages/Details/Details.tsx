import { useTranslation } from 'react-i18next'
import './Details.scss'
import { connect } from 'react-redux'
import { RootState } from 'redux/store/index'
import { useEffect, useState } from 'react'
import { IFilteredData, ILesson } from 'types/AnalysisTypes'
import { useParams, useNavigate } from 'react-router-dom'

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
  const { t } = useTranslation()
  const [state, setState] = useState<IState | null>(null)
  const { name, month } = useParams()
  const navigate = useNavigate()
  useEffect(() => {
    if (filteredAnalysis && filteredAnalysis?.length > 0 && name && month) {
      const data = filteredAnalysis.filter(x => x.schoolName === name.replace(/-/g, ' '))
      setState({
        schoolName: data[0].schoolName,
        ...data[0].lessons.filter((x: ILesson) => x.month === month)[0],
      })
    } else {
      navigate('/')
    }
  }, [filteredAnalysis, name, navigate, month])

  return (
    <div className="details">
      {state && (
        <div className="card">
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
const mapStateToProps = (state: RootState): IProps => {
  return {
    filteredAnalysis: state.AnalysisChart.filteredAnalysis,
  }
}
const mapDispatchToProps = {}

export default connect(mapStateToProps, mapDispatchToProps)(Details)
