import * as configSettings from '../app.config.json';
import * as packageJson from '../package.json';

export interface ISettings {
  environment: {
    version: string;
    mode: string;
  };
  server: {
    host: string;
    port: number;
    session: {
      secretKey: string;
    };
  };
  identity: {
    firstName: string;
    lastName: string;
    accessKey: string;
    password: string;
  };
  services: {
    roosterApi: string;
    mongoDb: {
      username: string;
      password: string;
      dbname: string;
    };
  };
}

const settings: ISettings = {
  ...configSettings,
  environment: {
    version: packageJson.version,
    mode: 'development',
  },
  server: {
    host: 'localhost',
    port: 9000,
    ...configSettings.server,
  },
  identity: {
    ...configSettings.identity,
  },
  services: {
    ...configSettings.services,
  }
};

//#region Settings Validation

function testValue(delegate: () => boolean, errorMessage: string): void {
  let validValue = true;
  try {
    validValue = delegate();
  } catch (error) { validValue = false; }
  if (!validValue) { throw new Error(errorMessage); }
}

testValue(() => !!configSettings.server.session.secretKey, 'The server session secret key was not set in the app.config.json file.');
testValue(() => !!configSettings.identity.accessKey, 'The identity access key was not set in the app.config.json file.');
testValue(() => !!configSettings.identity.password, 'The identity password was not set in the app.config.json file.');

//#endregion

export default settings;
