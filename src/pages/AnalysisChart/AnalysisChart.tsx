import { useTranslation } from 'react-i18next'
import './AnalysisChart.scss'
import ChartSection from 'pages/AnalysisChart/components/ChartSection/ChartSection'
import FilterBar from 'pages/AnalysisChart/components/FilterBar/FilterBar'
import Setting from 'components/Setting/Setting'

export default function AnalysisChart(): JSX.Element {
  const { t } = useTranslation()

  return (
    <div className="analysis-chart">
      <div className="header">
        <div>
          <h1>{t('Analysis chart')}</h1>
          <h3>{t('Number of lessons')}</h3>
        </div>
        <Setting />
      </div>
      <FilterBar />
      <ChartSection />
    </div>
  )
}
