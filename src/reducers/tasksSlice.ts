import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { TaskItem, TaskItemsState } from "../interfaces";

const initialState: TaskItemsState = {
    tasks: [],
    filter: 'all' 
};

export const taskSlice = createSlice({
  name: "task",
  initialState: initialState,
  reducers: {
    addTask: (state, action: PayloadAction<Omit<TaskItem, 'id'>>) => {
        const newTask = {...action.payload, completed: false, id: Date.now.toString()}
        state.tasks.push(newTask);
    },
    removeTask: (state, action: PayloadAction<string>) => {
        state.tasks = state.tasks.filter(item => item.id !== action.payload);
    },
    updateTask: (state, action: PayloadAction<TaskItem>) => {
        state.tasks = state.tasks.map(item => {
            if (item.id === action.payload.id) {
                return action.payload;
            }
            return item;
        });
    }
  },
});

export const { addTask, removeTask, updateTask } = taskSlice.actions;
export default taskSlice.reducer;