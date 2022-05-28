import React from 'react'
import { Provider } from 'react-redux'
import { render, RenderResult } from '@testing-library/react'
import { store } from 'redux/store/index'
import { BrowserRouter } from 'react-router-dom'

export const renderWithRedux = (component: React.ReactNode): RenderResult => {
  return {
    ...render(
      <Provider store={store}>
        <BrowserRouter>{component}</BrowserRouter>
      </Provider>,
    ),
  }
}
