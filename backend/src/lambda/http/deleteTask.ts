import 'source-map-support/register'

import { APIGatewayProxyEvent, APIGatewayProxyResult } from 'aws-lambda'

import { deleteTask } from '../../businessLogic/Tasks'
import { createLogger } from '../../utils/logger'
import { getUserId } from '../utils'

const logger = createLogger('Delete task')
export const handler = async (event: APIGatewayProxyEvent): Promise<APIGatewayProxyResult> => {
    logger.info('Delete task. Event: ', { event })
    const taskId = event.pathParameters.taskId
    // TODO: Remove a TODO item by id
    const userId = getUserId(event)
    await deleteTask(userId, taskId)

    return {
      statusCode: 204,
      headers: {
        'Access-Control-Allow-Origin': '*'
      },
      body: ''
    }
  }
