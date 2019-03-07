import { initialiseServer, startServer } from './startup';

async function start() {

  const server = await initialiseServer();
  startServer(server);

}

start().catch(error => {
  // tslint:disable-next-line: no-console
  console.error(error);
});
