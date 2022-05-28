import React, { Suspense } from 'react'
import './App.css'
import { useTranslation } from 'react-i18next'
import { Routes, Route } from 'react-router-dom'
import i18n from './i18n'

const AnalysisChart = React.lazy(() => import('pages/AnalysisChart/AnalysisChart'))
const Details = React.lazy(() => import('pages/Details/Details'))

function App(): JSX.Element {
  const { t } = useTranslation('', { i18n })
  return (
    <div data-testid="App" className="App">
      <Suspense fallback={<p>{t('loading...')}</p>}>
        <Routes>
          <Route path="/" element={<AnalysisChart />} />
          <Route path="/Details/:name/:noOfLesson" element={<Details />} />
        </Routes>
      </Suspense>
    </div>
  )
}

export default App
