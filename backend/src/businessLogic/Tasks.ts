import { v4 as uuidv4 } from 'uuid';
import 'source-map-support/register'
import { TodosAccess } from '../dataLayer/TodosAccess'
import { TaskModel } from '../models/Task'
import { SaveTaskRequest } from '../requests/SaveTaskRequest'
import { APIGatewayProxyEvent } from 'aws-lambda'
import { getUserId } from '../lambda/utils';
import { createLogger } from '../utils/logger'
const logger = createLogger('Task Magnage')

const todosAccess = new TodosAccess()

export async function getTasks(userId: string): Promise<TaskModel[]> {
  return await todosAccess.getTaskItems(userId)
}

export async function getTasksForUser(event: APIGatewayProxyEvent): Promise<TaskModel[]> {
  const userId = getUserId(event);
  return await todosAccess.getTaskItems(userId)
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
  await todosAccess.createTask(newItem)

  return newItem
}

async function updateTask(userId: string, taskId: string, saveTaskRequest: SaveTaskRequest) {
  let item = await todosAccess.getTaskItem(taskId, userId)

  if (!item)
    throw new Error('Item is not found')
    
  await todosAccess.updateTaskItem(taskId, userId, saveTaskRequest as SaveTaskRequest)
  item.title =  saveTaskRequest.title;
  item.description =  saveTaskRequest.description;
  return item
}

export async function deleteTask(userId: string, taskId: string) {
  const item = await todosAccess.getTaskItem(taskId, userId)

  if (!item)
    throw new Error('Item is not found')

  await todosAccess.deleteTaskItem(taskId, userId)
}

export async function updateStatusTask(userId: string, taskId: string, status: string) {
  const item = await todosAccess.getTaskItem(taskId, userId)

  if (!item)
    throw new Error('Item is not found')
    logger.info("item", item)
  await todosAccess.updateStatus(taskId, userId, status)
}
