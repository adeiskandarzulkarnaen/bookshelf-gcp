const Joi = require('joi');

const PostBookPayloadSchema = Joi.object({
  name: Joi.string().required().messages({
    'any.required': 'Gagal menambahkan buku. Mohon isi nama buku',
    'string.empty': 'name tidak boleh kosong',
  }),
  year: Joi.number().integer().min(1800).max(new Date().getFullYear()),
  author: Joi.string(),
  summary: Joi.string(),
  publisher: Joi.string(),
  pageCount: Joi.number().integer().min(0),
  readPage: Joi.number().integer().min(0).max(Joi.ref('pageCount')).messages({
    // eslint-disable-next-line max-len
    'number.max': 'Gagal menambahkan buku. readPage tidak boleh lebih besar dari pageCount',
  }),
  reading: Joi.boolean(),
});

const PutBookPayloadSchema = Joi.object({
  name: Joi.string().required().messages({
    'any.required': 'Gagal memperbarui buku. Mohon isi nama buku',
    'string.empty': 'name tidak boleh kosong',
  }),
  year: Joi.number().integer().min(1800).max(new Date().getFullYear()),
  author: Joi.string(),
  summary: Joi.string(),
  publisher: Joi.string(),
  pageCount: Joi.number().integer().min(0),
  readPage: Joi.number().integer().min(0).max(Joi.ref('pageCount')).messages({
    // eslint-disable-next-line max-len
    'number.max': 'Gagal memperbarui buku. readPage tidak boleh lebih besar dari pageCount',
  }),
  reading: Joi.boolean(),
});

module.exports = { PostBookPayloadSchema, PutBookPayloadSchema };
