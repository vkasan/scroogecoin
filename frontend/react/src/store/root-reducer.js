import { combineReducers } from '@reduxjs/toolkit';

import { userSlicer } from './user-slicer';
import { api } from './api';

export const rootReducer = combineReducers({
  [userSlicer.name]: userSlicer.reducer,
  [api.reducerPath]: api.reducer,
});
