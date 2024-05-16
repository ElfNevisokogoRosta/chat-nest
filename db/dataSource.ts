import { DataSource } from 'typeorm';
// eslint-disable-next-line @typescript-eslint/no-var-requires
require('dotenv').config();

export const AppDataSource = new DataSource({
  type: 'postgres',
  host: process.env.DB_HOST,
  port: parseInt(process.env.DB_PORT),
  username: process.env.DB_USERNAME,
  password: process.env.DB_PASSWORD,
  database: process.env.DB_NAME,
  entities: ['./db/entity/index.ts'],
  migrations: ['./db/migrations/*.ts'],
});
AppDataSource.initialize()
  .then(() => {
    console.log('Create some stuf');
  })
  .catch((err) => {
    console.error(`Err during Data Source init: ${err}`);
  });
