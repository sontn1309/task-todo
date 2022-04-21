import { v4 as uuidv4 } from 'uuid';
import 'source-map-support/register'
import { TodosAccess } from '../dataLayer/TodosAccess'
import { TaskModel } from '../models/Task'
import { SaveTaskRequest } from '../requests/SaveTaskRequest'
import { APIGatewayProxyEvent } from 'aws-lambda'
import { getUserId } from '../lambda/utils';

const todosAccess = new TodosAccess()

export async function getTasks(userId: string): Promise<TaskModel[]> {
  return await todosAccess.getTaskItems(userId)
}

export async function getTasksForUser(event: APIGatewayProxyEvent): Promise<TaskModel[]> {
  const userId = getUserId(event);
  return await todosAccess.getTaskItems(userId)
}

export async function createTodo(userId: string, createTodoRequest: SaveTaskRequest): Promise<TaskModel> {
  const taskId = uuidv4();
  const newItem: TaskModel = {
    userId,
    taskId,
    dateCreate: new Date().toISOString(),
    ...createTodoRequest
  }
  await todosAccess.createTodoItem(newItem)

  return newItem
}

export async function updateTodo(userId: string, taskId: string, updateTaskRequest: SaveTaskRequest) {
  const item = await todosAccess.getTaskItem(taskId, userId)

  if (!item)
    throw new Error('Item is not found')
    
  await todosAccess.updateTaskItem(taskId, userId, updateTaskRequest as SaveTaskRequest)
}

export async function deleteTask(userId: string, taskId: string) {
  const item = await todosAccess.getTaskItem(taskId, userId)

  if (!item)
    throw new Error('Item is not found')

  await todosAccess.deleteTaskItem(taskId, userId)
}
