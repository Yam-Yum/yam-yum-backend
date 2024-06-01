import { Injectable, OnModuleInit } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { drizzle, MySql2Database } from 'drizzle-orm/mysql2';
import mysql from 'mysql2/promise';

@Injectable()
export class DatabaseService implements OnModuleInit {
  public database: MySql2Database;

  constructor(private readonly configService: ConfigService) {}

  async onModuleInit() {
    const connection = await mysql.createConnection({
      host: 'host',
      user: 'user',
      database: 'database',
    });

    this.database = drizzle(connection);
  }
}
