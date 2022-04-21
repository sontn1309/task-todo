import 'source-map-support/register'

import { APIGatewayProxyEvent, APIGatewayProxyResult } from 'aws-lambda'
import { getTasksForUser } from '../../businessLogic/Tasks'
import { createLogger } from '../../utils/logger'

const logger = createLogger('GetTask')
export const handler = async (event: APIGatewayProxyEvent): Promise<APIGatewayProxyResult> => {
    logger.info('GetTask. Event', { event })
   
  const status = String(event.queryStringParameters.status);
  const result = await getTasksForUser(event);
  const items = result.filter(x => x.status === status)
  return {
    statusCode: 200,
    headers: {
      'Access-Control-Allow-Origin': '*'
    },
    body: JSON.stringify({
      items
    })
  }
  }
