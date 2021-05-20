import { createSlice } from '@reduxjs/toolkit';

const filterSlice = createSlice({
  name: 'filter',
  initialState: '',
  reducers: {
    filterStudent(state, { payload }) {
      return payload;
    },
  },
});

export const { filterStudent } = filterSlice.actions;

export default filterSlice.reducer;