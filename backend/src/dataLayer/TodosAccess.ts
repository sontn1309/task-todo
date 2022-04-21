import * as AWS from 'aws-sdk'
import { DocumentClient } from 'aws-sdk/clients/dynamodb'
import * as AWSXRay from 'aws-xray-sdk'
import 'source-map-support/register'

import { TaskModel } from '../models/Task'
import { SaveTaskRequest } from '../requests/SaveTaskRequest'

AWS.config.update({
    region: "us-west-2",
});

const XAWS = AWSXRay.captureAWS(AWS)

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
        taskId,
        userId
      }
    }).promise()

    return result.Item as TaskModel
  }

  async createTodoItem(taskItem: TaskModel) {
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
      UpdateExpression: 'set #title = :title, description = :description, status = :status',
      ExpressionAttributeNames: {
        "#title": "title"
      },
      ExpressionAttributeValues: {
        ":title": taskUpdate.title,
        ":description": taskUpdate.description,
        ":status": taskUpdate.status
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