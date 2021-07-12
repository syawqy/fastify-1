import fp from 'fastify-plugin';
import Sequelize from 'sequelize';

import { insert,getAll } from '../../services/book-service';
import { GetBookTO,BookTO } from './schema';

export default fp((server, opts, next) => {

    server.post("/book", {schema : BookTO}, (request, reply) => {
        try {
            insert(server,request.body).then(data => {
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

    server.get("/book/getAll", {schema : GetBookTO}, (request, reply) => {
        try {
            getAll(server,request.body).then(data => {
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