export const CreateBookTO = {
  description: 'BookDetail',
  tags: ['Book'],
  summary: 'Book',
  body: {
    type: 'object',
    properties: {
      bookTitle: { type: 'string' },
      author: { type: 'string' },
      subject: { type: 'string' },
      year: { type: 'number' }
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
          year: { type: 'number' }
        }
      }
    }
  }
}

export const BookTO = {
  description: 'BookDetail',
  tags: ['Book'],
  summary: 'Book',
  body: {
    type: 'object',
    properties: {
      bookId: { type: 'number' },
      bookTitle: { type: 'string' },
      author: { type: 'string' },
      subject: { type: 'string' },
      year: { type: 'number' }
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
          year: { type: 'number' }
        }
      }
    }
  }
}

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
          year: { type: 'string' }
        }
      }
    }
  }
}

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
          year: { type: 'string' }
        }
      }
    }
  }
}

export const DeleteBookTO = {
  description: 'BookDetail',
  tags: ['Book'],
  summary: 'Book',
  body: {
    type: 'object',
    properties: {
      bookId: { type: 'number' }
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
          year: { type: 'string' }
        }
      }
    }
  }
}
