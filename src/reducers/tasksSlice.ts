import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { TaskItem, TaskItemsState } from "../interfaces";

const initialState: TaskItemsState = {
  tasks: [],
  filter: "all",
};

export const taskSlice = createSlice({
  name: "task",
  initialState: initialState,
  reducers: {
    // Load all tasks (replace entire array)
    loadTasks: (state, action: PayloadAction<TaskItem[]>) => {
      state.tasks = action.payload; // Direct assignment (Immer handles immutability)
    },

    // Add a new task
    addTask: (state, action: PayloadAction<Omit<TaskItem, "id">>) => {
      const newTask: TaskItem = {
        ...action.payload,
        id: Date.now().toString(), // Fixed: Date.now() is a function
        completed: false,
      };
      state.tasks.push(newTask); // Safe mutation (Immer handles it)
    },

    // Remove a task by ID
    removeTask: (state, action: PayloadAction<string>) => {
      state.tasks = state.tasks.filter((task) => task.id !== action.payload);
    },

    // Update a task (full replacement)
    updateTask: (state, action: PayloadAction<TaskItem>) => {
      const index = state.tasks.findIndex((task) => task.id === action.payload.id);
      if (index !== -1) {
        state.tasks[index] = action.payload; // Direct assignment (Immer-safe)
      }
    },
  },
});

export const { loadTasks, addTask, removeTask, updateTask } = taskSlice.actions;
export default taskSlice.reducer;
