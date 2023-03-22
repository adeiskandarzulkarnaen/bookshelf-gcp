const autoBind = require('auto-bind');

class Handler {
  constructor(service, validator) {
    this._service = service;
    this._validator = validator;

    autoBind(this);
  }

  postbookHandler({ payload }, h) {
    this._validator.validatePostBookPayload(payload);

    const bookId = this._service.addBook(payload);
    const response = h.response({
      status: 'success',
      message: 'Buku berhasil ditambahkan',
      data: {
        bookId,
      },
    });
    response.code(201);
    return response;
  }

  getAllBooksHandler({ query }) {
    const books = this._service.getAllBooks(query);

    return {
      status: 'success',
      data: {
        books,
      },
    };
  }

  getBookByIdHandler({ params }) {
    const book = this._service.getBookById(params.bookId);

    return {
      status: 'success',
      data: {
        book,
      },
    };
  }

  putBookByIdHandler({ params, payload }) {
    this._validator.validatePutBookPayload(payload);

    this._service.editBook(params.bookId, payload);

    return {
      status: 'success',
      message: 'Buku berhasil diperbarui',
    };
  }

  deleteBookByIdHandler({ params }) {
    this._service.deleteBook(params.bookId);

    return {
      status: 'success',
      message: 'Buku berhasil dihapus',
    };
  }
}

module.exports = Handler;
