export const BookTO = {
    description: 'BookDetail',
    tags: ['Book'],
    summary: 'Book',
    body: {
        type: 'object',
        properties: {
            title: { type: 'string' },
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
                data: { type: 'string' }
            }
        }
    }
};

export const GetBookTO = {
    description: 'BookDetail',
    tags: ['Book'],
    summary: 'Book',
    response: {
        200: {
            description: 'Successful response',
            type: 'object',
            properties: {
                success: { type: 'string' },
                message: { type: 'string' },
                data: { type: 'string' }
            }
        }
    }
};
