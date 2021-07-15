import { Sequelize } from "sequelize/types";
import { BooksFactory } from "../../plugins/db/models";

export default class BookService {
    db: Sequelize;
    bookDb;
    constructor(db) {
        this.db = db;
        this.bookDb = BooksFactory(db);
    }

    insert = (body) => new Promise((resolve,reject) => {
        const {bookTitle,author,subject,year} = body;
    
        this.bookDb.create({bookTitle,author,subject,year, createdBy : "user"})
            .then(data => {
                const {bookTitle,author,subject,year, createdBy} = data;
                resolve({bookTitle,author,subject,year, createdBy});
            }).catch(err => {
                reject(err);
            });
    });

    getAll = (body) => new Promise((resolve,reject) => {
        const {pageSize,pageNum} = body;
        const offset = pageNum*pageSize;
    
        this.bookDb.findAll({limit:pageSize,offset})
            .then(data => {
                resolve(data);
            }).catch(err => {
                reject(err);
            });
    });

    getOne = (body) => new Promise((resolve,reject) => {
        const {bookId} = body;
        
        this.bookDb.findByPk(bookId)
            .then(data => {
                resolve(data);
            }).catch(err => {
                reject(err);
            });
    });
    
    update = (body) => new Promise((resolve,reject) => {
        const {bookId,bookTitle,author,subject,year} = body;
    
        this.bookDb.update({bookTitle,author,subject,year},{where:{bookId}})
            .then(data => {
                resolve(data);
            }).catch(err => {
                reject(err);
            });
    });
    
    remove = (body) => new Promise((resolve,reject) => {
        const {bookId} = body;
    
        this.bookDb.destroy({where:{bookId}})
            .then(data => {
                resolve(data);
            }).catch(err => {
                reject(err);
            });
    });

}
