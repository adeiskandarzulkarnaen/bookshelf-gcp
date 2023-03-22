const { nanoid } = require('nanoid');
const ClientError = require('../../exception/ClientError');

class Service {
  constructor() {
    this._books = [];
  }

  addBook(payload) {
    const id = `book-${nanoid(16)}`;
    const finished = payload.pageCount === payload.readPage;
    const insertedAt = new Date().toISOString();
    const updatedAt = insertedAt;

    const newBook = {
      id,
      ...payload,
      finished,
      insertedAt,
      updatedAt,
    };

    this._books.push(newBook);
    const isSuccess = this._books.filter((book) => book.id === id).length > 0;
    if (!isSuccess) throw new Error('Buku gagal ditambahkan');
    return id;
  }

  getAllBooks(query) {
    const { name, reading, finished } = query;

    let filteredBooks = this._books;

    if (name) {
      filteredBooks = this._books.filter((book) => {
        return book.name.toLowerCase().includes(name.toLowerCase());
      });
    }

    if (reading) {
      filteredBooks = this._books.filter((book) => {
        return Number(book.reading) === Number(reading);
      });
    }

    if (finished) {
      filteredBooks = this._books.filter((book) => {
        return Number(book.finished) === Number(finished);
      });
    }

    const mappedBooks = filteredBooks.map((book) => ({
      id: book.id,
      name: book.name,
      publisher: book.publisher,
    }));
    return mappedBooks;
  }

  getBookById(id) {
    const book = this._books.filter((b) => b.id === id)[0];

    if (!book) throw new ClientError('Buku tidak ditemukan', 404);
    return book;
  }

  editBook(id, payload) {
    const index = this.verifyBookAvailability(id, 'Gagal memperbarui buku.');
    const updatedAt = new Date().toISOString();

    this._books[index] = {
      ...this._books[index],
      ...payload,
      updatedAt,
    };
  }

  deleteBook(id) {
    const index = this.verifyBookAvailability(id, 'Buku gagal dihapus.');
    this._books.splice(index, 1);
  }

  verifyBookAvailability(id, errorMessage = '') {
    const index = this._books.findIndex((book) => book.id === id);
    if (index === -1) {
      throw new ClientError(`${errorMessage} Id tidak ditemukan`, 404);
    };
    return index;
  }
}

module.exports = Service;
