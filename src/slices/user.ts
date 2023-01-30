import {PayloadAction, createSlice} from '@reduxjs/toolkit';

const initialState = {
  name: '',
  email: '',
  accessToken: '',
  money: 0,
};
const userSlice = createSlice({
  name: 'user',
  initialState,
  reducers: {
    setUser(state, action: PayloadAction<Omit<typeof initialState, 'money'>>) {
      state.email = action.payload.email;
      state.name = action.payload.name;
      state.accessToken = action.payload.accessToken;
    },
    setMoney(state, action: PayloadAction<number>) {
      state.money = action.payload;
    },
    setAccessToken(
      state,
      action: PayloadAction<(typeof initialState)['accessToken']>,
    ) {
      state.accessToken = action.payload;
    },
  },
  //   extraReducers: builder => {},
});

export default userSlice;
