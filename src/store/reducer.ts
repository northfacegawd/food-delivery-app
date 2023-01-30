import {combineReducers} from '@reduxjs/toolkit';
import useSlice from '../slices/user';
import orderSlice from '../slices/order';

const rootReducer = combineReducers({
  user: useSlice.reducer,
  order: orderSlice.reducer,
});

export type RootState = ReturnType<typeof rootReducer>;
export default rootReducer;
