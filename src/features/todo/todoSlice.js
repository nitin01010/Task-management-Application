import { createSlice } from '@reduxjs/toolkit';

export const todoSlice = createSlice({
  name: 'todoSlice',
  initialState: {
    value: [],
  },
  reducers: {
    addTodo: (state, action) => {
      state.value.push(action.payload);
    },
    deleteTodo: (state, action) => {
      state.value = state.value.filter(todo => todo.id !== action.payload);
    },
    updateTodo: (state, action) => {
      const { id, task } = action.payload;
      const todoToUpdate = state.value.find(todo => todo.id === id);
      if (todoToUpdate) {
        todoToUpdate.task = task;
      }
    }
  },
});

export const { addTodo, deleteTodo,updateTodo } = todoSlice.actions;
export default todoSlice.reducer;
