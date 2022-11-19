/* eslint-disable linebreak-style */
import { StartPage } from 'components/StartPage'
import React from 'react'
import { Provider } from 'react-redux'
import { combineReducers, configureStore } from '@reduxjs/toolkit';
import { library } from './reducers/library';

export const App = () => {
  const reducer = combineReducers({
    library: library.reducer
  });

  const store = configureStore({
    reducer
  });

  return (
    <Provider store={store}>
      <StartPage />
    </Provider>
  )
}
