import { apiEndpoint } from '../config'
import Axios from 'axios'
import { SaveTaskRequest } from '../types/SaveTaskRequest';
import { TaskModel } from '../types/Task';

export async function getTasks(idToken: string, status: string): Promise<TaskModel[]> {
  const response = await Axios.get(`${apiEndpoint}/tasks?status=${status}`, {
    headers: {
      'Content-Type': 'application/json',
      'Authorization': `Bearer ${idToken}`
    },
  })
  return response.data.items
}

export async function saveTask(
  idToken: string,
  saveTaskRequest: SaveTaskRequest
): Promise<TaskModel> {
  const response = await Axios.post(`${apiEndpoint}/tasks`, JSON.stringify(saveTaskRequest), {
    headers: {
      'Content-Type': 'application/json',
      'Authorization': `Bearer ${idToken}`
    }
  })
  return response.data.items
}

export async function deleteTask(
  idToken: string,
  taskId: string
): Promise<void> {
  await Axios.delete(`${apiEndpoint}/tasks/${taskId}`, {
    headers: {
      'Content-Type': 'application/json',
      'Authorization': `Bearer ${idToken}`
    }
  })
}

export async function updateStatus(
  idToken: string,
  taskId: string,
  status: string
): Promise<void> {
  await Axios.patch(`${apiEndpoint}/tasks/${taskId}?status=${status}`, JSON.stringify({ status }), {
    headers: {
      'Content-Type': 'application/json',
      'Authorization': `Bearer ${idToken}`
    }
  })
}



