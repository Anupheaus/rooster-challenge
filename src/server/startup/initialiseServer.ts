// tslint:disable:no-console
import { bodyParserHandler, sessionHandler, userHandler, registerRoutes, notFoundHandler, errorHandler, HttpMethods } from 'anux-exchange';
import settings from '../../settings';
import * as cookieParser from 'cookie-parser';
import * as express from 'express';
import * as path from 'path';
import * as routes from '../routes';
import { connectToDatabase } from '../database';

export async function initialiseServer() {

  await connectToDatabase();

  const app = express();

  // view engine setup

  const pathToViews = path.resolve(__dirname, '../views');

  app.set('views', pathToViews);
  app.set('view engine', 'pug');

  // uncomment after placing your favicon in /public
  // app.use(favicon(path.join(__dirname, 'public', 'favicon.ico')));
  // app.use(logger('dev'));
  app.use(bodyParserHandler());
  app.use(cookieParser());
  app.use(express.static(path.join(__dirname, '../../../dist')));
  app.use(sessionHandler({ secretKey: settings.server.session.secretKey }));
  app.use(userHandler(() => settings.identity));

  app.use(registerRoutes({
    routes,
    router: express.Router(),
    pathToViews,
    onRequestStarted(url, method) { console.log(`${HttpMethods[method].toUpperCase()}: ${url}`); },
    onRequestEnded(url, method, code, timeTaken) { console.log(`${HttpMethods[method].toUpperCase()}: ${url} (${code}, ${timeTaken}ms)`); },
  }));
  app.use(notFoundHandler());
  const errorHandlerRoute = errorHandler({
    title: 'Rooster Money Coding Challenge - Error',
    outputStackTrace: true,
  });
  app.all('*', errorHandlerRoute);
  app.use(errorHandlerRoute);

  return app;

}
