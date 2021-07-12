export const BookTO = {
    description: 'BookDetail',
    tags: ['Book'],
    summary: 'Book',
    body: {
        type: 'object',
        properties: {
            bookId: { type: 'string' },
            bookTitle: { type: 'string' },
            author: { type: 'string' },
            subject: { type: 'string' },
            year: { type: 'string' },
        }
    },
    response: {
        200: {
            description: 'Successful response',
            type: 'object',
            properties: {
                success: { type: 'string' },
                message: { type: 'string' },
                data: { 
                    bookTitle: { type: 'string' },
                    author: { type: 'string' },
                    subject: { type: 'string' },
                    year: { type: 'string' },
                 }
            }
        }
    }
};

export const GetBookTO = {
    description: 'BookDetail',
    tags: ['Book'],
    summary: 'Book',
    params: {
        type: 'object',
        properties: {
          pageSize: {
            type: 'number',
            description: 'page size'
          },
          pageNum: {
              type: 'number',
              description: 'page number'
          }
        }
    },
    response: {
        200: {
            description: 'Successful response',
            type: 'object',
            properties: {
                success: { type: 'string' },
                message: { type: 'string' },
                data: { 
                    bookTitle: { type: 'string' },
                    author: { type: 'string' },
                    subject: { type: 'string' },
                    year: { type: 'string' },
                 }
            }
        }
    }
};

export const GetOneBookTO = {
    description: 'BookDetail',
    tags: ['Book'],
    summary: 'Book',
    params: {
        type: 'object',
        properties: {
          bookId: {
            type: 'number',
            description: 'book id'
          }
        }
    },
    response: {
        200: {
            description: 'Successful response',
            type: 'object',
            properties: {
                success: { type: 'string' },
                message: { type: 'string' },
                data: { 
                    bookTitle: { type: 'string' },
                    author: { type: 'string' },
                    subject: { type: 'string' },
                    year: { type: 'string' },
                 }
            }
        }
    }
};

