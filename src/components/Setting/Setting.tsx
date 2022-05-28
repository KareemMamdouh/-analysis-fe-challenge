import { useTranslation } from 'react-i18next'
import { useState, useEffect } from 'react'
import './Setting.scss'
import i18n from 'i18n'

export default function Setting(): JSX.Element {
  const { t } = useTranslation('', { i18n })
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
  const handleLang = (value: string): void => {
    if (value === 'en') {
      setLang('en')
      localStorage.setItem('Lang', 'en')
      i18n.changeLanguage('en')
    } else {
      setLang('fr')
      localStorage.setItem('Lang', 'fr')
      i18n.changeLanguage('fr')
    }
  }

  return (
    <div data-testid="select-section" className="select-section">
      <select
        data-testid="handle-lang"
        onChange={(e: React.ChangeEvent<HTMLSelectElement>) => handleLang(e.target.value)}
        value={lang}>
        <option value="en">{t('English')}</option>
        <option value="fr">{t('French')}</option>
      </select>
      <select
        data-testid="handle-mode"
        onChange={(e: React.ChangeEvent<HTMLSelectElement>) => handleMode(e.target.value)}
        value={mode}>
        <option value="Light">{t('Light')}</option>
        <option value="Dark">{t('Dark')}</option>
      </select>
    </div>
  )
}
