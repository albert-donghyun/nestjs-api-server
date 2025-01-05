import { readFileSync } from 'fs';
import { DataSource } from 'typeorm';

const ormConfig = JSON.parse(
  readFileSync(__dirname + '/../ormconfig.json', { encoding: 'utf-8' }),
);
const AppDataSource = new DataSource(ormConfig);

AppDataSource.initialize()
  .then(() => console.log('Data Source has been initialized!'))
  .catch((err) =>
    console.error('Error during Data Source initialization', err),
  );

export { AppDataSource };
