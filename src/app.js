import 'dotenv/config'; // carregando todas as variaveis ambientes

import express from 'express';
import 'express-async-errors'; // importe sempre antes das rotas
import path from 'path';
import * as Sentry from '@sentry/node';
import Youch from 'youch';

import sentryConfig from './config/sentry';
import routes from './routes';

import './database/index';

class App {
  constructor() {
    this.server = express();

    Sentry.init(sentryConfig);

    this.server.use(Sentry.Handlers.requestHandler()); // antes de todas as rotas SENTRY
    this.middlewares();
    this.routes();
    this.exceptionHandler();
  }

  middlewares() {
    this.server.use(express.json());
    this.server.use('/files', express.static(path.resolve(__dirname, '..', 'tmp', 'uploads'))); // agr o express sabe onde estar as img para usar na rota /files
  }

  routes() {
    this.server.use(routes);
    this.server.use(Sentry.Handlers.errorHandler()); // depois de todas as rotas SENTRY
  }

  exceptionHandler() {
    this.server.use( async (err, req, res, next) => {

      if (process.env.NODE_ENV === 'development') {
        const errors = await new Youch(err, req).toJSON();

        return res.status(500).json(errors);
      }

      return res.status(500).json({ error: 'Internal server error' });
    });

  }
}

export default new App().server;
