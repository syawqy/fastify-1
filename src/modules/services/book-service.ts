import { BooksFactory } from "../../plugins/db/models";

export const insert = (server,body) => new Promise((resolve,reject) => {
    const bookDb = BooksFactory(server.db);
    const {title,author,subject,year} = body;

    bookDb.create({title,author,subject,year, createdBy : "user"})
        .then(data => {
            const {title,author,subject,year, createdBy} = data;
            resolve({title,author,subject,year, createdBy});
        }).catch(err => {
            reject(err);
        });
});

export const getAll = (server,body) => new Promise((resolve,reject) => {
    const bookDb = BooksFactory(server.db);

    bookDb.findAll()
        .then(data => {
            resolve(data);
        }).catch(err => {
            reject(err);
        });
});