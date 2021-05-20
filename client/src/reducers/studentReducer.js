import { createSlice } from '@reduxjs/toolkit';

const studentSlice = createSlice({
  name: 'students',
  initialState: [],
  reducers: {
    addStudent(state, { payload }) {
      state.push(payload);
    },
    removeStudent(state, { payload }) {
      const { _id } = payload;
      const filtered = state.filter((item) => item._id !== _id);
      return filtered;
    },
  },
});

export const { addStudent, removeStudent } = studentSlice.actions;

export default studentSlice.reducer;