import * as AWS from 'aws-sdk'
import { DocumentClient } from 'aws-sdk/clients/dynamodb'
import * as AWSXRay from 'aws-xray-sdk'
import 'source-map-support/register'

import { TaskModel } from '../models/Task'
import { SaveTaskRequest } from '../requests/SaveTaskRequest'

AWS.config.update({
    region: "us-west-2",
});

import { createLogger } from '../utils/logger'
const XAWS = AWSXRay.captureAWS(AWS)

const logger = createLogger('Task Magnage')

export class TodosAccess {
  constructor(
    private readonly docClient: DocumentClient = new XAWS.DynamoDB.DocumentClient(),
    private readonly taskTable = process.env.TASK_TABLE,
    private readonly taskByUserIndex = process.env.TASK_INDEX
  ) {}

  async todoItemExists(taskId: string, userId: string): Promise<boolean> {
    const item = await this.getTaskItem(taskId, userId)
    return !!item
  }

async getTaskItems(userId: string): Promise<TaskModel[]> {

    const result = await this.docClient.query({
      TableName: this.taskTable,
      IndexName: this.taskByUserIndex,
      KeyConditionExpression: 'userId = :userId',
      ExpressionAttributeValues: {
        ':userId': userId
      }
    }).promise()
    return result.Items as TaskModel[]
  }

  async getTaskItem(taskId: string, userId: string): Promise<TaskModel> {
    const result = await this.docClient.get({
      TableName: this.taskTable,
      Key: {
        "userId": userId,
        "taskId": taskId
      }
    }).promise()

    return result.Item as TaskModel
  }

  async createTask(taskItem: TaskModel) {
    await this.docClient.put({
      TableName: this.taskTable,
      Item: taskItem,
    }).promise()
  }

  async updateTaskItem(taskId: string, userId :string, taskUpdate: SaveTaskRequest) {
    await this.docClient.update({
      TableName: this.taskTable,
      Key: {
        taskId,
        userId
      },
      UpdateExpression: 'set title = :title, description = :description',
      ExpressionAttributeValues: {
        ":title": taskUpdate.title,
        ":description": taskUpdate.description,
      }
    }).promise()   
  }

  async updateStatus(taskId: string, userId :string, status: string) {
    logger.info('Update status', taskId,userId, status)

    await this.docClient.update({
      TableName: this.taskTable,
      Key: {
        "userId": userId,
        "taskId": taskId
      },
      UpdateExpression: 'set #status = :status',
      ExpressionAttributeNames: {
        "#status": "status"
      },
      ExpressionAttributeValues: {
        ":status": status,
      }
    }).promise()   
  }

  async deleteTaskItem(taskId: string, userId: string) {
    await this.docClient.delete({
      TableName: this.taskTable,
      Key: {
        taskId,
        userId
      }
    }).promise()    
  }
}