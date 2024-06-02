import { Injectable, OnModuleInit } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { drizzle, MySql2Database } from 'drizzle-orm/mysql2';
import mysql from 'mysql2/promise';

@Injectable()
export class DatabaseService implements OnModuleInit {
  private database: MySql2Database;

  constructor(private readonly configService: ConfigService) {}

  async onModuleInit() {
    const connection = await mysql
      .createConnection({
        host: this.configService.get('DATABASE_HOST'),
        user: this.configService.get('DATABASE_USER'),
        password: this.configService.get('DATABASE_PASSWORD'),
        database: this.configService.get('DATABASE_NAME'),
        port: this.configService.get('DATABASE_PORT'),
        uri: this.configService.get('DATABASE_URL'),
      })
      .then((connection) => {
        console.log('connection succeed');
        return connection;
      })
      .catch((error) => {
        console.log('error: ', error);
        throw error;
      });

    this.database = drizzle(connection);
  }

  public get instance() {
    return this.database;
  }
}
