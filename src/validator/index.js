const ClientError = require('../exception/ClientError');
const { PostBookPayloadSchema, PutBookPayloadSchema } = require('./schema');

const Validator = {
  validatePostBookPayload: (payload) => {
    const validationResult = PostBookPayloadSchema.validate(payload);
    if (validationResult.error) {
      throw new ClientError(validationResult.error.message);
    }
  },

  validatePutBookPayload: (payload) => {
    const validationResult = PutBookPayloadSchema.validate(payload);
    if (validationResult.error) {
      throw new ClientError(validationResult.error.message);
    }
  },
};

module.exports = Validator;
