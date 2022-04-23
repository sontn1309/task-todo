import { v4 as uuidv4 } from 'uuid';
import 'source-map-support/register'
import { TaskService } from '../dataLayer/TaskService'
import { TaskModel } from '../models/Task'
import { SaveTaskRequest } from '../requests/SaveTaskRequest'
import { APIGatewayProxyEvent } from 'aws-lambda'
import { getUserId } from '../lambda/utils';
import { createLogger } from '../utils/logger'
const logger = createLogger('Task Magnage')

const taskService = new TaskService()

export async function getTasks(userId: string): Promise<TaskModel[]> {
  return await taskService.getTaskItems(userId)
}

export async function getTasksForUser(event: APIGatewayProxyEvent): Promise<TaskModel[]> {
  const userId = getUserId(event);
  return await taskService.getTaskItems(userId)
}

export async function saveTask(userId: string, saveTaskRequest: SaveTaskRequest): Promise<TaskModel> {
  let taskId = saveTaskRequest.taskId ;
  if (taskId) {
    return await updateTask(userId, taskId, saveTaskRequest)
  }
  taskId = uuidv4();
  const newItem: TaskModel = {
    userId: userId,
    taskId : taskId,
    dateCreate: new Date().toLocaleString(),
    title : saveTaskRequest.title,
    status : "define",
    description: saveTaskRequest.description
  }
  await taskService.createTask(newItem)

  return newItem
}

async function updateTask(userId: string, taskId: string, saveTaskRequest: SaveTaskRequest) {
  let item = await taskService.getTaskItem(taskId, userId)

  if (!item)
    throw new Error('Item is not found')
    
  await taskService.updateTaskItem(taskId, userId, saveTaskRequest as SaveTaskRequest)
  item.title =  saveTaskRequest.title;
  item.description =  saveTaskRequest.description;
  return item
}

export async function deleteTask(userId: string, taskId: string) {
  const item = await taskService.getTaskItem(taskId, userId)

  if (!item)
    throw new Error('Item is not found')

  await taskService.deleteTaskItem(taskId, userId)
}

export async function updateStatusTask(userId: string, taskId: string, status: string) {
  const item = await taskService.getTaskItem(taskId, userId)

  if (!item)
    throw new Error('Item is not found')
    logger.info("item", item)
  await taskService.updateStatus(taskId, userId, status)
}
