// tslint:disable: no-console
import settings from '../../settings';
import * as express from 'express';

export function startServer(app: express.Application): void {
  const { environment: { version, mode }, server: { host, port } } = settings;
  console.log(`Starting server...
    Version: ${version}
    Mode: ${mode}
    Host: ${host}
    Port: ${port}`);

  app.listen(port, (error: Error) => {
    if (error) {
      console.error(`Failed to initialise server due to the following error:`, { error });
      return process.exit(1);
    }
    console.log('Server ready and waiting...');
  });
}
