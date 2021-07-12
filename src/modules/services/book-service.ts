import { BooksFactory } from "../../plugins/db/models";

export const insert = (server,body) => new Promise((resolve,reject) => {
    const bookDb = BooksFactory(server.db);
    const {bookTitle,author,subject,year} = body;

    bookDb.create({bookTitle,author,subject,year, createdBy : "user"})
        .then(data => {
            const {bookTitle,author,subject,year, createdBy} = data;
            resolve({bookTitle,author,subject,year, createdBy});
        }).catch(err => {
            reject(err);
        });
});

export const getAll = (server,body) => new Promise((resolve,reject) => {
    const bookDb = BooksFactory(server.db);
    const {pageSize,pageNum} = body;
    const offset = pageNum*pageSize;

    bookDb.findAll({limit:pageSize,offset})
        .then(data => {
            resolve(data);
        }).catch(err => {
            reject(err);
        });
});

export const getOne = (server,body) => new Promise((resolve,reject) => {
    const bookDb = BooksFactory(server.db);
    const {bookId} = body;
    
    bookDb.findByPk(bookId)
        .then(data => {
            resolve(data);
        }).catch(err => {
            reject(err);
        });
});

export const update = (server,body) => new Promise((resolve,reject) => {
    const bookDb = BooksFactory(server.db);
    const {bookId,bookTitle,author,subject,year} = body;

    bookDb.update({bookTitle,author,subject,year},{where:{bookId}})
        .then(data => {
            resolve(data);
        }).catch(err => {
            reject(err);
        });
});

export const remove = (server,body) => new Promise((resolve,reject) => {
    const bookDb = BooksFactory(server.db);
    const {bookId} = body;

    bookDb.destroy({where:{bookId}})
        .then(data => {
            resolve(data);
        }).catch(err => {
            reject(err);
        });
});