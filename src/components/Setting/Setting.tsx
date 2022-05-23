import { useTranslation } from 'react-i18next'
import { useState, useEffect } from 'react'
import './Setting.scss'

export default function AnalysisChart(): JSX.Element {
  const { t, i18n } = useTranslation()
  const [lang, setLang] = useState<string>('en')
  const [mode, setMode] = useState<string>('Light')
  const handleMode = (value: string): void => {
    if (value === 'Dark') {
      setMode('Dark')
      localStorage.setItem('Mode', 'Dark')
      document.documentElement.style.setProperty('--main-bg-color', '#262626')
      document.documentElement.style.setProperty('--white-bg-color', '#222')
      document.documentElement.style.setProperty('--primary-color', '#8A5EA9')
      document.documentElement.style.setProperty('--red-color', '#F3838B')
      document.documentElement.style.setProperty('--gray-color', '#ccc')
      document.documentElement.style.setProperty('--select-bg-color', '#2b9fd8')
      document.documentElement.style.setProperty('--select-bg-color', '#2b9fd880')
      document.documentElement.style.setProperty('--select-color', '#fff')
      document.documentElement.style.setProperty('--scroll-color', '#999')
      document.documentElement.style.setProperty('--scroll-bg-color', '#ccc')
    } else {
      setMode('Light')
      localStorage.setItem('Mode', 'Light')
      document.documentElement.style.setProperty('--main-bg-color', '#F5F6FA')
      document.documentElement.style.setProperty('--white-bg-color', '#fff')
      document.documentElement.style.setProperty('--primary-color', '#8A5EA9')
      document.documentElement.style.setProperty('--red-color', '#F3838B')
      document.documentElement.style.setProperty('--gray-color', '#777')
      document.documentElement.style.setProperty('--select-bg-color', '#2b9fd8')
      document.documentElement.style.setProperty('--select-bg-color', '#2b9fd880')
      document.documentElement.style.setProperty('--select-color', '#000')
      document.documentElement.style.setProperty('--scroll-color', '#999')
      document.documentElement.style.setProperty('--scroll-bg-color', '#ccc')
    }
  }
  useEffect(() => {
    const Lang = localStorage.getItem('Lang')
    const Mode = localStorage.getItem('Mode')
    if (Lang) {
      setLang(Lang)
    }
    if (Mode) {
      setMode(Mode)
      handleMode(Mode)
    }
  }, [])
  const handleLang = (e: React.ChangeEvent<HTMLSelectElement>): void => {
    if (e.target.value === 'en') {
      i18n.changeLanguage('en')
      setLang('en')
      localStorage.setItem('Lang', 'en')
    } else {
      i18n.changeLanguage('fr')
      setLang('fr')
      localStorage.setItem('Lang', 'fr')
    }
  }

  return (
    <div className="select-section">
      <select onChange={handleLang} value={lang}>
        <option value="en">{t('English')}</option>
        <option value="fr">{t('French')}</option>
      </select>
      <select onChange={(e: React.ChangeEvent<HTMLSelectElement>) => handleMode(e.target.value)} value={mode}>
        <option value="Light">{t('Light')}</option>
        <option value="Dark">{t('Dark')}</option>
      </select>
    </div>
  )
}
