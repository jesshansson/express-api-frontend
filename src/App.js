/* eslint-disable linebreak-style */
import { StartPage } from 'components/StartPage'
import { TopList } from 'components/TopList';
import React from 'react'
import { Provider } from 'react-redux'
import { combineReducers, configureStore } from '@reduxjs/toolkit';
import { PaigeWrapper, InnerWrapper } from 'components/GlobalStyles';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
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
      <PaigeWrapper>
        <InnerWrapper>
          <BrowserRouter>
            <Routes>
              <Route path="/" element={<StartPage />} />
              <Route path="/toplist" element={<TopList />} />
            </Routes>
          </BrowserRouter>
        </InnerWrapper>
      </PaigeWrapper>
    </Provider>
  )
}
