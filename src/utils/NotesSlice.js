import { createSlice } from "@reduxjs/toolkit";

const NotesSlice = createSlice({
  name: "notes",
  initialState: {
    notes: {
      items: [],
    },
  },
  reducers: {
    addItem: (state, action) => {
      const newItem = action.payload;
      state.notes.items = [...state.notes.items, newItem];
    },
  },
});

export default NotesSlice.reducer;
export const { addItem } = NotesSlice.actions;
