export const ConsumeTO = {
  description: 'Kafka Consumer Detail',
  tags: ['Kafka'],
  summary: 'Kafka Consumer',
  body: {
    type: 'object',
    properties: {
      topic: { type: 'string' }
    }
  },
  response: {
    200: {
      description: 'Successful response',
      type: 'object',
      properties: {
        success: { type: 'string' },
        message: { type: 'string' },
        data: {
          type: 'array',
          items: {
            type: 'object',
            properties: {
              topic: { type: 'string' },
              value: { type: 'string' },
              offset: { type: 'number' },
              partition: { type: 'number' },
              highWaterOffset: { type: 'number' }
            }
          }
        }
      }
    }
  }
}

export const PublishTO = {
  description: 'Kafka Publish Detail',
  tags: ['Kafka'],
  summary: 'Kafka Publish',
  body: {
    type: 'object',
    properties: {
      topic: { type: 'string' },
      message: { type: 'string' }
    }
  },
  response: {
    200: {
      description: 'Successful response',
      type: 'object',
      properties: {
        success: { type: 'string' },
        message: { type: 'string' },
        data: {
          type: 'object',
          properties: {
            topic: { type: 'string' },
            value: { type: 'string' },
            offset: { type: 'number' },
            partition: { type: 'number' },
            highWaterOffset: { type: 'number' }
          }
        }
      }
    }
  }
}
