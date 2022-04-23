import { APIGatewayProxyEvent, APIGatewayProxyResult } from 'aws-lambda'
import 'source-map-support/register'
import { SaveTaskRequest } from '../../requests/SaveTaskRequest'
import { getUserId } from '../utils';
import { saveTask } from '../../businessLogic/Tasks'
import { createLogger } from '../../utils/logger'

const logger = createLogger('Save task')
export const handler = async (event: APIGatewayProxyEvent): Promise<APIGatewayProxyResult> =>{
  logger.info('Save task. Event: ', { event })
   const newTodo: SaveTaskRequest = JSON.parse(event.body) as SaveTaskRequest
    const userId = getUserId(event)
    const item = await saveTask(userId, newTodo)

    return {
      statusCode: 200,
      headers: {
        'Access-Control-Allow-Origin': '*',
        'Access-Control-Allow-Credentials': true
      },
      body: JSON.stringify({
          item
      })
    }
  }