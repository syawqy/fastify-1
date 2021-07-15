import { KafkaMessages, KafkaMessagesAttributes } from "../../plugins/db/models/kafkaMessage";
import { kafkaSubscribe } from "../../plugins/kafka/consumer";
import { KafkaMessagesFactory } from "../../plugins/db/models";
export default class KafkaService {
    server:any;
    kafkaMDb;

    constructor(server) {
        this.server = server;
        this.kafkaMDb = KafkaMessagesFactory(server.db);
    }

    insertDb = async (body) => {
        try {
            const {topic,message} = body;
            let data = await this.kafkaMDb.create({topic,message, createdBy:"user"})
            const {createdBy} = data;

            return {topic,message,createdBy};
        }catch(err) {
            throw err;
        }
    };

    insertBulk = async (body) => {
        try {
            const {rows} = body;
            let newrows:KafkaMessagesAttributes[] = rows.map(a => ({topic:a.topic,message:a.value,createdBy:"user"}));
            
            let data = await this.kafkaMDb.bulkCreate(newrows);
            let newdata = data.map(a => ({topic:a.topic,value:a.message}));
            return newdata;
        }catch(err) {
            throw err;
        }
    }

    subscribeTopic = async (topic:string,callback:Function=null) => {
        kafkaSubscribe(this.server.kafkaClient, topic,async (messages) => {
            this.server.log.info(messages);
            await this.insertDb({topic,message:JSON.stringify(messages)});
            if(callback) callback(messages); 
        });
    }
}