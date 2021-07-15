import fp from 'fastify-plugin';
import Sequelize from 'sequelize';
import { sendApmError } from '../../../utils';

import { publish } from '../../../plugins/kafka/producer';
import BookService from '../../services/bookService';
import { GetBookTO,BookTO,GetOneBookTO,DeleteBookTO,CreateBookTO } from './schema';

export default fp((server, opts, next) => {
    const bookService = new BookService(server.db);

    server.post("/book", {schema : CreateBookTO}, (request, reply) => {
        try {
            bookService.insert(request.body).then(data => {
                publish(server.kafkaClient,"bookInsert",JSON.stringify(data));
                return reply.code(200).send({
                    success: true,
                    message: 'Successful!',
                    data
                });
            }).catch(err => {
                sendApmError(server,request,err);

                return reply.code(400).send({
                    success: false,
                    message: 'Error insert data.',
                    err,
                });
            });
        } catch(error) {
            server.apm.captureError({
                method: request.routerMethod,
                path: request.routerPath,
                param: request.body,
                error: error,
            });

            request.log.error(error);
            return reply.send(400);
        }
    });

    server.get("/book/getAll/:pageSize/:pageNum", {schema : GetBookTO}, (request, reply) => {
        try {
            bookService.getAll(request.params).then(data => {
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
                    stack: err.stack
                });

                return reply.code(400).send({
                    success: false,
                    message: 'Error get data.',
                    err,
                });
            });
        } catch(error) {
            server.apm.captureError({
                method: request.routerMethod,
                path: request.routerPath,
                param: request.body,
                error: error,
            });

            request.log.error(error);
            return reply.send(400);
        }
    });

    server.get("/book/:bookId", {schema : GetOneBookTO}, (request, reply) => {
        try {
            bookService.getOne(request.params).then(data => {
                console.log(data);
                return reply.code(200).send({
                    success: true,
                    message: 'Successful!',
                    data
                });
            }).catch(err => {
                sendApmError(server,request,err);;

                return reply.code(400).send({
                    success: false,
                    message: 'Error get data.',
                    err,
                });
            });
        } catch(error) {
            server.apm.captureError({
                method: request.routerMethod,
                path: request.routerPath,
                param: request.body,
                error: error,
            });

            request.log.error(error);
            return reply.send(400);
        }
    });

    server.post("/book/update", {schema : BookTO}, (request, reply) => {
        try {
            bookService.update(request.body).then(data => {
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
            server.apm.captureError({
                method: request.routerMethod,
                path: request.routerPath,
                param: request.body,
                error: error,
            });

            request.log.error(error);
            return reply.send(400);
        }
    });

    server.post("/book/delete", {schema : DeleteBookTO}, (request, reply) => {
        try {
            bookService.remove(request.body).then(data => {
                console.log(data);
                return reply.code(200).send({
                    success: true,
                    message: 'Successful!',
                    data
                });
            }).catch(err => {
                sendApmError(server,request,err);;

                return reply.code(400).send({
                    success: false,
                    message: 'Error delete data.',
                    err,
                });
            });
        } catch(error) {
            server.apm.captureError({
                method: request.routerMethod,
                path: request.routerPath,
                param: request.body,
                error: error,
            });

            request.log.error(error);
            return reply.send(400);
        }
    });


    next();
});