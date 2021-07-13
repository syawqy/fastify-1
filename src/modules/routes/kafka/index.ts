import fp from 'fastify-plugin';
import Sequelize from 'sequelize';

import {insert,insertBulk } from '../../services/kafka-service';
import { publish } from '../../../plugins/kafka/producer';
import { kafkaSubscribe } from '../../../plugins/kafka/consumer';
import { ConsumeTO,PublishTO } from './schema';

export default fp((server, opts, next) => {

    server.post("/kafka/subscribe", {schema : ConsumeTO}, (request, reply) => {
        try {
            const { topic } = request.body;

            let count = 0;
            let data = [];

            kafkaSubscribe(server.kafkaClient, topic, async (messages) => {
                count++;
                data.push(messages);
                
                if (count == messages.highWaterOffset) {
                    insertBulk(server,{rows:data}).then(data => {
                        return reply.code(200).send({
                            success: true,
                            message: 'subscribed data has been saved',
                            data
                        });
                    }).catch(err => {
                        return reply.code(400).send({
                            success: false,
                            message: 'Error insert to db.',
                            err,
                        });
                    });
                }
            });

        } catch(error) {
            request.log.error(error);
            return reply.send(400);
        }
    });

    server.post("/kafka/publish", {schema : PublishTO}, (request, reply) => {
        try {
            const { topic,message } = request.body;

            publish(server.kafkaClient,topic,message)
            .then(data => {
                
                return reply.code(200).send({
                    success: true,
                    message: 'Successful!',
                    data
                });
            }).catch(err => {
                return reply.code(400).send({
                    success: false,
                    message: 'Error get data.',
                    err,
                });
            });
            
        } catch(error) {
            request.log.error(error);
            return reply.send(400);
        }
    });

    next();
});