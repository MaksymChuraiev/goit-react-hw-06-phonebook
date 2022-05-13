import { createSlice } from '@reduxjs/toolkit';
import { persistReducer } from 'redux-persist';
// const { createSlice } = require('@reduxjs/toolkit');
import storage from 'redux-persist/lib/storage';

export const contactsSlice = createSlice({
  name: 'contacts',
  initialState: {
    items: [],
    filter: '',
  },
  reducers: {
    createContacts(state, action) {
      state.items.push(action.payload);
    },
    addFilter(state, action) {
      state.filter = action.payload;
    },
  },
});

const persistConfig = {
  key: 'contacts',
  storage,
};

export const contactsReducer = persistReducer(
  persistConfig,
  contactsSlice.reducer
);

export const { createContacts, addFilter } = contactsSlice.actions;

export const getContacts = ({ contacts }) => contacts.items;
export const getFilter = ({ contacts }) => contacts.filter;
