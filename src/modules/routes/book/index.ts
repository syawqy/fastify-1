import fp from 'fastify-plugin';
import Sequelize from 'sequelize';

import { insert,getAll,getOne,update,remove } from '../../services/book-service';
import { GetBookTO,BookTO,GetOneBookTO } from './schema';

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

    server.get("/book/getAll/:pageSize/:pageNum", {schema : GetBookTO}, (request, reply) => {
        try {
            getAll(server,request.params).then(data => {
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

    server.put("/book", {schema : BookTO}, (request, reply) => {
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

    server.delete("/book/:bookId", {schema : GetOneBookTO}, (request, reply) => {
        try {
            remove(server,request.params).then(data => {
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