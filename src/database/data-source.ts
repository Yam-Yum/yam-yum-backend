import { DataSource, DataSourceOptions } from 'typeorm';
import * as dotenv from 'dotenv';
import { runSeeder, runSeeders, SeederOptions } from 'typeorm-extension';
import CartSeeder from './seeds/cart/cart.seeder';
dotenv.config();

export const dataSourceOptions: DataSourceOptions & SeederOptions = {
  type: 'mysql',
  host: process.env.DATABASE_HOST,
  port: Number(process.env.DATABASE_PORT),
  username: process.env.DATABASE_USER,
  password: process.env.DATABASE_PASSWORD,
  database: process.env.DATABASE_NAME,
  entities: ['dist/**/*.entity.js'],
  migrations: ['dist/database/migrations/*.js'],

  synchronize: false,
  logging: false,

  seeds: ['dist/database/seeds/**/*.seeder.js'],
  factories: ['dist/database/seeds/**/*.factory.js'],
};

const dataSource = new DataSource(dataSourceOptions);
dataSource
  .initialize()
  .then(() => {
    console.log('Data Source has been initialized!');
  })
  .catch((err) => {
    console.error('Error during Data Source initialization', err);
  });

// (async () => {
//   await runSeeder(dataSource, CartSeeder);
// })();

export default dataSource;
