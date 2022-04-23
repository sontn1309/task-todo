import 'source-map-support/register'

import { APIGatewayProxyEvent, APIGatewayProxyResult } from 'aws-lambda'

import { updateStatusTask } from '../../businessLogic/Tasks'
import { createLogger } from '../../utils/logger'
import { getUserId } from '../utils'


const logger = createLogger('UpdateTodo')
export const handler = async (event: APIGatewayProxyEvent): Promise<APIGatewayProxyResult> => {
    logger.info('UpdateTodo. Event', { event })
    let statusList =  new Array("done","define", "inprocess");

    const taskId = event.pathParameters.taskId
    const status = String(event.queryStringParameters.status);
    if (statusList.indexOf(status) < 0) {
        return {
            statusCode: 400,
            headers: {
              'Access-Control-Allow-Origin': '*'
            },
            body: 'Status must be one of done, define, inprocess'
          }
    }
    // TODO: Update a TODO item with the provided id using values in the "updatedTodo" object
    const userId = getUserId(event)
  
    await updateStatusTask(userId, taskId, status)

    return {
      statusCode: 200,
      headers: {
        'Access-Control-Allow-Origin': '*'
      },
      body: ''
    }
  }