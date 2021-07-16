import { KafkaMessages, KafkaMessagesAttributes } from '../../plugins/db/models/kafkaMessage'
import { kafkaSubscribe } from '../../plugins/kafka/consumer'
import { KafkaMessagesFactory } from '../../plugins/db/models'
export default class KafkaService {
    server:any;
    kafkaMDb;

    constructor (server) {
      this.server = server
      this.kafkaMDb = KafkaMessagesFactory(server.db)
    }

    insertDb = async (body) => {
      try {
        const { topic, message } = body
        const data = await this.kafkaMDb.create({ topic, message, createdBy: 'user' })
        const { createdBy } = data

        return { topic, message, createdBy }
      } catch (err) {
        throw err
      }
    };

    insertBulk = async (body) => {
      try {
        const { rows } = body
        const newrows:KafkaMessagesAttributes[] = rows.map(a => ({ topic: a.topic, message: a.value, createdBy: 'user' }))

        const data = await this.kafkaMDb.bulkCreate(newrows)
        const newdata = data.map(a => ({ topic: a.topic, value: a.message }))
        return newdata
      } catch (err) {
        throw err
      }
    }

    subscribeTopic = async (topic:string) => {
      kafkaSubscribe(this.server.kafkaClient, topic, async (message) => {
        try { 
          this.server.log.info(message)
          const msg = JSON.stringify(message);
          const checkData = await this.kafkaMDb.findAll({where:{message:msg}});
          if(checkData.length==0) {
            await this.insertDb({ topic, message: msg })
          }
        }catch(err) {
          throw err;
        }
      })
    }
}
