/* eslint-disable linebreak-style */
import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  bookSearch: '',
  authorSelect: []

}

export const library = createSlice({
  name: 'library',
  initialState,
  reducers: {

    setBookSearch: (store, action) => {
      store.bookSearch = action.payload
      store.authorSelect = []
    },
    setAuthorSelect: (store, action) => {
      store.authorSelect = action.payload
      store.bookSearch = ''
    }
  }

})