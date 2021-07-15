import { SimpleIntervalJob, AsyncTask, Task } from 'toad-scheduler'

import BookService from './bookService';

let counter = 10;

export class JobBook {
    db: any;

    constructor(db) {
        this.db = db;
    }

    insertBook = async () => {
        console.log(`----------------Start Job----------------`);
        try {
            const bookService = new BookService(this.db);

            console.log('Job Insert Running');
            counter++

            const dataInput = {
                bookTitle: `${counter}-judul`,
                author: `${counter}-pengarang`,
                subject: `${counter}-subjek`,
                year: 1920+counter,
            };


            await bookService.insert(dataInput);

        } catch (error) {
            console.error(`Job Insert - error ${error}`);
        } finally {
            console.log(`----------------End of Job----------------`);
        }
    };

    // must use promise
    taskInsertBook = new AsyncTask('jobTestInsertBook', this.insertBook, err => {
        console.log('Job Insert - error', err);
    });

    jobInsertBook = new SimpleIntervalJob({ seconds: 19, runImmediately: true }, this.taskInsertBook, 'jobTestInsertBook');
}