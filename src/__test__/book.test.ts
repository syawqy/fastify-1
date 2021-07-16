import BookService from '../modules/services/bookService'
import * as instance from '../server'
import SequelizeMock from 'sequelize-mock'

const token = 'Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VybmFtZSI6InRlc3R1c2VybmFtZSJ9.KLDiMFN3QkOAS8mprDbCoYu1t4yPcmvBZaqtQYti38I'

let server: any
beforeAll(async () => {
  server = await instance.createServer()
})

describe('Book class', () => {
  const dbMock = new SequelizeMock()

  const dataInput = {
    bookTitle: 'judul',
    author: 'author',
    subject: 'subject',
    year: 1999
  }

  const bookService = new BookService(dbMock)

  // Spying on the actual methods of the class
  jest.spyOn(bookService, 'insert')
  jest.spyOn(bookService, 'getAll')
  jest.spyOn(bookService, 'getOne')
  jest.spyOn(bookService, 'update')
  jest.spyOn(bookService, 'remove')

  it('should insert data', async () => {
    const insertData = await bookService.insert(dataInput)
    expect(insertData).toBeTruthy()
    expect(bookService.insert).toHaveBeenCalledTimes(1)
  })

  it('should get all data', async () => {
    const result = await bookService.getAll({ pageSize: 5, pageNum: 0 })
    console.log(result)
    expect(result).toBeTruthy()
    expect(bookService.getAll).toHaveBeenCalledTimes(1)
  })

  it('should get one data', async () => {
    const result = await bookService.getOne({ bookId: 22 })
    // console.log(result);
    expect(result).toBeTruthy()
    expect(bookService.getOne).toHaveBeenCalledTimes(1)
  })

  it('should update data', async () => {
    const result = await bookService.update(dataInput)
    // console.log(result);
    expect(result).toBeTruthy()
    expect(bookService.update).toHaveBeenCalledTimes(1)
  })

  it('should remove data', async () => {
    const result = await bookService.remove({ bookId: 1 })
    expect(result).toBeTruthy()
    expect(bookService.remove).toHaveBeenCalledTimes(1)
  })
})

describe('book: insert', () => {
  const dataInput = {
    bookTitle: 'judul',
    author: 'author',
    subject: 'subject',
    year: 1999
  }

  const dataMockResp = {
    success: 'true',
    message: 'Insert successful!',
    data: {
      ...dataInput,
      createdBy: 'user'
    }
  }

  test('POST returns 200', async () => {
    const response = await server.inject({
      method: 'POST',
      url: '/book',
      headers: {
        Authorization: token
      },
      body: dataInput
    })
    expect(response.statusCode).toBe(200)
    expect(JSON.parse(response.payload).message).toBe('Successful!')
  })
})
