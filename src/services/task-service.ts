//import { createAsyncThunk } from "@reduxjs/toolkit";
import { APIServiceOptions, TaskItem } from "../interfaces";
import { AppDispatch } from "../store";
import { makeRequest } from "../services";
import { removeTask, addTask, updateTask } from "../reducers/tasksSlice";
import { API, API_ENDPOINTS } from "../constants/endpoints";

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
  let success = false;
  const options: APIServiceOptions<TaskItem> = { url:`${API.URL.BASE}${API_ENDPOINTS.TASK.ADD}`, method:"post", data:task};
  try {
    const response = await makeRequest(options);
    if (response) {
      dispatch(addTask(task));
      success = true;
    }
  } 
  catch (error) {
    console.error('Error deleting task:', error);
  }
  finally {
    return success;
  }
};

export const updateTaskItem = async (task: TaskItem, dispatch: AppDispatch): Promise<Boolean> => {
  let success = false;
  const options: APIServiceOptions<{name: string, description: string}> = { url:`${API.URL.BASE}${API_ENDPOINTS.TASK.ADD}/${task.id}`, method:"put", data:{name: task.name, description:task.description}};
  try {
    const response = await makeRequest(options);
    if (response) {
      dispatch(updateTask(task));
      success = true;
    }
  } 
  catch (error) {
    console.error('Error in updating task:', error);
  }
  finally {
    return success;
  }
};


export const deleteTaskItem = async (taskId: string, dispatch: AppDispatch): Promise<Boolean> => {
  let success = false;
  const options: APIServiceOptions<any> = { url:`${API.URL.BASE}${API_ENDPOINTS.TASK.ADD}/${taskId}`, method:"delete" };
  try {
    const response = await makeRequest(options);
    if (response) {
      dispatch(removeTask(taskId));
      success = true;
    }
  } 
  catch (error) {
    console.error('Error deleting task:', error);
  }
  finally {
    return success;
  }
};