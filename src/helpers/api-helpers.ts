import { ApiResponse, APIServiceOptions, TaskItem } from "../interfaces";
import { AppDispatch } from "../store";
import { makeRequest } from "../services";
import { removeTask, addTask } from "../reducers/tasksSlice";
import { API, API_ENDPOINTS } from "../constants/endpoints";


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

export const handleResponse = <T>(response: ApiResponse<T>) => ({
  status: response.status,
  data: response.data,
  arguments: response.request?.responseURL,
});

export const handleResponseWithHeaders = <T>(response: ApiResponse<T>) => ({
  status: response.status,
  data: response.data,
  arguments: response.request?.responseURL,
  headers: response.headers,
});
