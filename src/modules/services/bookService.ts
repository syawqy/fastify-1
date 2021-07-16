import { Sequelize } from 'sequelize/types'
import { BooksFactory } from '../../plugins/db/models'

export default class BookService {
    db: Sequelize;
    bookDb;
    constructor (db) {
      this.db = db
      this.bookDb = BooksFactory(db)
    }

    insert = async (body) => {
      try {
        const { bookTitle, author, subject, year } = body
        const data = await this.bookDb.create({ bookTitle, author, subject, year, createdBy: 'user' })
        const { createdBy } = data
        return { bookTitle, author, subject, year, createdBy }
      } catch (err) {
        throw err
      }
    }

    getAll = async (body) => {
      try {
        const { pageSize, pageNum } = body
        const offset = pageNum * pageSize

        const data = await this.bookDb.findAll({ limit: pageSize, offset })
        return data
      } catch (err) {
        throw err
      }
    }

    getOne = async (body) => {
      try {
        const { bookId } = body

        const data = await this.bookDb.findOne({ where: { bookId } })
        return data
      } catch (err) {
        throw err
      }
    }

    update = async (body) => {
      try {
        const { bookId, bookTitle, author, subject, year } = body

        const data = await this.bookDb.update({ bookTitle, author, subject, year }, { where: { bookId } })
        return { bookTitle, author, subject, year }
      } catch (err) {
        throw err
      }
    }

    remove = async (body) => {
      try {
        const { bookId } = body
        const getData = await this.bookDb.findOne({ where: { bookId } })
        if (getData) {
          const data = await this.bookDb.destroy({ where: { bookId } })
          return data
        } else {
          throw 'data tidak ditemukan'
        }
      } catch (err) {
        throw err
      }
    }
}
