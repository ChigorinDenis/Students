import { createSlice } from '@reduxjs/toolkit';

const sortSlice = createSlice({
  name: 'sort',
  initialState: {
    field: 'fio',
    order: 'asc',
  },
  reducers: {
    sortStudent(state, { payload }) {
      return { ...state, ...payload };
    },
  },
});

export const { sortStudent } = sortSlice.actions;

export default sortSlice.reducer;