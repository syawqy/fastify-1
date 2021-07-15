import { KafkaMessages, KafkaMessagesAttributes } from "plugins/db/models/kafkaMessage";
import { KafkaMessagesFactory } from "../../plugins/db/models";

export const insert = (server,body) => new Promise((resolve,reject) => {
    const kafkaMDb = KafkaMessagesFactory(server.db);
    const {topic,message} = body;
    
    kafkaMDb.create({topic,message, createdBy:"user"})
        .then(data => {
            const {topic,message, createdBy} = data;
            resolve({topic,message, createdBy});
        }).catch(err => {
            reject(err);
        });
});

export const insertBulk = (server,body) => new Promise((resolve,reject) => {
    const kafkaMDb = KafkaMessagesFactory(server.db);
    // console.log(body);
    const {rows} = body;
    let newrows:KafkaMessagesAttributes[] = rows.map(a => ({topic:a.topic,message:a.value,createdBy:"user"}));
    // console.log(newrows);
    
    kafkaMDb.bulkCreate(newrows)
        .then(data => {
            let newdata = data.map(a => ({topic:a.topic,value:a.message}));
            resolve(newdata);
        }).catch(err => {
            reject(err);
        });
});