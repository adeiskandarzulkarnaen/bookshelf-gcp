/* eslint-disable max-len */

const Hapi = require('@hapi/hapi');

/* Books */
const books = require('./api');
const Service = require('./services/inMemory/Service');
const Validator = require('./validator');

/* exceptions */
const ClientError = require('./exception/ClientError');

const init = async () => {
  const service = new Service();

  const server = Hapi.server({
    host: 'localhost',
    port: 9000,
    routes: {
      cors: {
        origin: ['*'],
      },
    },
  });

  server.ext('onPreResponse', (request, h) => {
    /* mendapatkan konteks response dari request. */
    const { response } = request;

    if (response instanceof Error) {
      /* penanganan client error secara internal. */
      if (response instanceof ClientError) {
        const newResponse = h.response({
          status: 'fail',
          message: response.message,
        });
        newResponse.code(response.statusCode);
        return newResponse;
      }

      /* mempertahankan penanganan client error oleh hapi secara native */
      if (!response.isServer) {
        return h.continue;
      }

      /* penanganan server error sesuai kebutuhan */
      const newResponse = h.response({
        status: 'error',
        message: 'terjadi kegagalan pada server kami',
      });
      newResponse.code(500);
      console.error(`keterangan: ${response.message}`);
      return newResponse;
    }

    /* jika bukan error, lanjutkan dengan response sebelumnya (tanpa terintervensi) */
    return h.continue;
  });

  await server.register({
    plugin: books,
    options: {
      service,
      validator: Validator,
    },
  });

  await server.start();
  console.log(`Server berjalan pada ${server.info.uri}`);
};

init();
