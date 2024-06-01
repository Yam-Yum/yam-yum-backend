import {
  mysqlEnum,
  mysqlTable,
  serial,
  timestamp,
  varchar,
} from 'drizzle-orm/mysql-core';
import { sql } from 'drizzle-orm';

const chiefRequestApplication = mysqlTable('chief_request_application', {
  id: varchar('id', { length: 255 })
    .primaryKey()
    .unique()
    .default(sql`(uuid())`),
  requestNumber: serial('request_number').notNull(),
  status: mysqlEnum('status', ['pending', 'accepted', 'rejected'])
    .notNull()
    .default('pending'),
  createdAt: timestamp('created_at', { mode: 'string' }).notNull().defaultNow(),
  updatedAt: timestamp('updated_at', { mode: 'string' }).notNull().defaultNow(),
});

export default chiefRequestApplication;
