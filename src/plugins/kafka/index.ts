
import fp from 'fastify-plugin'
import { KafkaClient as Client, KafkaClientOptions } from 'kafka-node'

import { kafkaConfig } from './config'

const kafkaPlugin = async (server, opts, next) => {
  const config: KafkaClientOptions = kafkaConfig(server)
  const client = new Client(config)

  // decorators
  server.decorate('kafkaClient', client)
}

export default fp(kafkaPlugin)
