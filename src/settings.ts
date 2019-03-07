// tslint:disable-next-line: no-var-requires
try { require('../envs.js'); } catch (e) { /* do nothing */ }
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

function getEnv<T>(variableName: string, defaultValue?: T): T {
  const convert = (value): T =>
    (typeof (defaultValue) === 'number' && Number.parseFloat(value))
    || (typeof (defaultValue) === 'boolean' && value == 'true') // tslint:disable-line: triple-equals
    || value;
  const result = convert(process.env[variableName]);
  if (result == null && defaultValue == null) { throw new Error(`The ${variableName} environment variable has not been set.`); }
  return result || defaultValue;
}

const settings: ISettings = {
  environment: {
    version: packageJson.version,
    mode: getEnv('MODE', 'production'),
  },
  server: {
    host: getEnv('HOST', 'localhost'),
    port: getEnv('PORT', 8080),
    session: {
      secretKey: getEnv('SESSION_KEY', Math.uniqueId()),
    },
  },
  identity: {
    accessKey: getEnv('ROOSTER_ACCESS_KEY'),
    password: getEnv('ROOSTER_PASSWORD'),
  },
  services: {
    roosterApi: getEnv('ROOSTER_API', 'https://api.roostermoney.com/v1'),
    mongoDb: {
      username: getEnv('MONGODB_USERNAME'),
      password: getEnv('MONGODB_PASSWORD'),
      dbname: getEnv('MONGODB_DBNAME'),
    },
  },
};

export default settings;
