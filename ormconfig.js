require('dotenv').config({
  path: `.env.${process.env.NODE_ENV}`,
});
const { DataSource } = require('typeorm');

const dbConfig = {
  synchronize: false,
  migrations: ['migrations/*.ts'],
  cli: {
    migrationsDir: 'migrations',
  },
};

switch (process.env.NODE_ENV) {
  case 'dev':
    Object.assign(dbConfig, {
      type: 'better-sqlite3',
      database: 'db.sqlite',
      entities: ['**/*.entity.js'],
      migrations: ['migrations/*.js'],
    });
    break;

  case 'test':
    Object.assign(dbConfig, {
      type: 'better-sqlite3',
      database: 'test.sqlite',
      entities: ['**/*.entity.ts'],
      migrationsRun: true,
    });
    break;

  case 'prod':
    Object.assign(dbConfig, {
      type: 'postgres',
      url: process.env.DATABASE_URL,
      entities: ['**/*.entity.js'],
      migrations: ['migrations/*.ts'],
      migrationsRun: true,
      ssl: {
        rejectUnauthorized: false,
      },
    });
    break;

  default:
    throw new Error('unknown environment');
}

module.exports = new DataSource(dbConfig);
