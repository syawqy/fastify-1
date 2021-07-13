import fp from 'fastify-plugin';
import Sequelize from 'sequelize';

import { publish } from '../../../plugins/kafka/producer';
import { insert,getAll,getOne,update,remove } from '../../services/book-service';
import { GetBookTO,BookTO,GetOneBookTO,DeleteBookTO,CreateBookTO } from './schema';

export default fp((server, opts, next) => {

    server.post("/book", {schema : CreateBookTO}, (request, reply) => {
        try {
            insert(server,request.body).then(data => {
                publish(server.kafkaClient,"bookInsert",JSON.stringify(data));
                return reply.code(200).send({
                    success: true,
                    message: 'Successful!',
                    data
                });
            }).catch(err => {
                server.apm.captureError({
                    method: request.routerMethod,
                    path: request.routerPath,
                    param: request.body,
                    error: err,
                })

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

    server.get("/book/getAll/:pageSize/:pageNum", {schema : GetBookTO}, (request, reply) => {
        try {
            getAll(server,request.params).then(data => {
                return reply.code(200).send({
                    success: true,
                    message: 'Successful!',
                    data
                });
            }).catch(err => {
                server.apm.captureError({
                    method: request.routerMethod,
                    path: request.routerPath,
                    param: request.body,
                    error: err,
                })
                
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

    server.get("/book/:bookId", {schema : GetOneBookTO}, (request, reply) => {
        try {
            getOne(server,request.params).then(data => {
                console.log(data);
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

    server.post("/book/update", {schema : BookTO}, (request, reply) => {
        try {
            update(server,request.body).then(data => {
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

    server.post("/book/delete", {schema : DeleteBookTO}, (request, reply) => {
        try {
            remove(server,request.body).then(data => {
                console.log(data);
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