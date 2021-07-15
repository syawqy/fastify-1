import fp from 'fastify-plugin';
import Sequelize from 'sequelize';

import KafkaService from '../../services/kafkaService';
import { publish } from '../../../plugins/kafka/producer';
import { ConsumeTO,PublishTO } from './schema';
import { sendApmError } from '../../../utils';

export default fp((server, opts, next) => {
    const kafkaService = new KafkaService(server);

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
                sendApmError(server,request,err);

                return reply.code(400).send({
                    success: false,
                    message: 'Error get data.',
                    err,
                });
            });
            
        } catch(error) {
            sendApmError(server,request,error);

            request.log.error(error);
            return reply.send(400);
        }
    });

    next();
});