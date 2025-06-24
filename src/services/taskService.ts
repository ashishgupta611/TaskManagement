//import { createAsyncThunk } from "@reduxjs/toolkit";
import { APIServiceOptions, TaskItem } from "../interfaces";
import { AppDispatch } from "../store";
import { makeRequest } from ".";
import { removeTask, addTask, updateTask } from "../reducers/tasksSlice";
import { API, API_ENDPOINTS } from "../constants/endpoints";
import { startLoading, stopLoading } from '../reducers/loadingSlice';
import { addMessage } from "../reducers/messageSlice";
import Chance from 'chance';

// export const fetchProducts = createAsyncThunk(
// "products/fetchProducts",
// async (_ { dispatch }) => {
// dispatch(productsLoading());
// const response = await axiosInstance-get ("products");
// dispatch(produstsLoaded(response.data));
// );

// export const fetchProducts = createAsyncThunk("fetchTask",
// async (_ { dispatch }) => {
// dispatch(productsLoading());
//const response = await axiosInstance-get ("products");
//dispatch(produstsLoaded(response.data));
//);

export const addTaskItem = async (task: Omit<TaskItem, 'id'>, dispatch: AppDispatch): Promise<Boolean> => {
  const newTask = {
    ...task, 
    id: Chance().string({length: 10, pool: '0123456789' }),
    creationDate: Date.now(),
  };
  return await createNewTask(newTask, dispatch);
};

export const createNewTask = async (task: TaskItem, dispatch: AppDispatch): Promise<Boolean> => {
let success = false;
  dispatch(startLoading({ loadingText: 'Adding ...' }));
  const options: APIServiceOptions<TaskItem> = { url:`${API.URL.BASE}${API_ENDPOINTS.TASK.ADD}`, method:"post", data:task};
  try {
    const response = await makeRequest(options);
    if (response) {
      success = true;
      dispatch(addTask(task));
      dispatch(addMessage({text: 'Task added successfully.', type: 'success'}));
    }
  } 
  catch (error) {
    console.error('Error deleting task:', error);
    dispatch(addMessage({text: 'Something went wrong. Play try again.', type: 'error'}));
  }
  finally {
    dispatch(stopLoading());
    return success;
  }
};

export const updateTaskItem = async (task: TaskItem, dispatch: AppDispatch): Promise<Boolean> => {
  let success = false;
  dispatch(startLoading({ loadingText: 'Updating ...' }));
  const options: APIServiceOptions<{name: string, description: string}> = { url:`${API.URL.BASE}${API_ENDPOINTS.TASK.ADD}/${task.id}`, method:"put", data:{name: task.title, description:task.description}};
  try {
    const response = await makeRequest(options);
    if (response) {
      success = true;
      dispatch(updateTask(task));
      dispatch(addMessage({text: 'Task updated successfully.', type: 'success'}));
    }
  } 
  catch (error) {
    console.error('Error in updating task:', error);
    dispatch(addMessage({text: 'Something went wrong. Play try again.', type: 'error'}));
  }
  finally {
    dispatch(stopLoading());
    return success;
  }
};


export const deleteTaskItem = async (taskId: string, dispatch: AppDispatch): Promise<Boolean> => {
  let success = false;
  dispatch(startLoading({ loadingText: 'Deleting ...' }));

  const options: APIServiceOptions<any> = { url:`${API.URL.BASE}${API_ENDPOINTS.TASK.ADD}/${taskId}`, method:"delete" };
  try {
    const response = await makeRequest(options);
    if (response) {
      success = true;
      dispatch(removeTask(taskId));
      dispatch(addMessage({text: 'Task deleted successfully.', type: 'success'}));
    }
  } 
  catch (error) {
    console.error('Error deleting task:', error);
    dispatch(addMessage({text: 'Something went wrong. Play try again.', type: 'error'}));
  }
  finally {
    dispatch(stopLoading());
    return success;
  }
};