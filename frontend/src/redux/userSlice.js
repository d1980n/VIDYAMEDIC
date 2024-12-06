import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  nama: null, // Change from 'name' to 'email'
  namaKlinik: null,
};

const userSlice = createSlice({
  name: 'user',
  initialState,
  reducers: {
    storeEmail: (state, action) => {
      state.nama = action.payload; // Update the state with the user's email
      console.log(action)
    },
    storeMitra: (state, action) => {
      state.namaKlinik = action.payload; // Update the state with the user's email
      console.log(action)
    },

    clearUser: (state) => {
      state.nama = null; // Reset email on logout or clear user action
    },
  },
});

export const { storeEmail, clearUser, storeMitra } = userSlice.actions;

export default userSlice.reducer;
