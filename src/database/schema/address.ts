import {
  mysqlEnum,
  mysqlTable,
  timestamp,
  varchar,
} from 'drizzle-orm/mysql-core';
import { relations, sql } from 'drizzle-orm';
import user from './user';
import order from './order';

const address = mysqlTable('address', {
  id: varchar('id', { length: 255 })
    .primaryKey()
    .unique()
    .default(sql`(uuid())`),
  addressLine1: varchar('addressLine1', { length: 255 }).notNull(),
  addressLine2: varchar('addressLine2', { length: 255 }),
  longitude: varchar('longitude', { length: 255 }).notNull(),
  latitude: varchar('latitude', { length: 255 }).notNull(),
  type: mysqlEnum('type', ['home', 'office', 'other']).notNull(),
  userId: varchar('user_id', { length: 255 })
    .notNull()
    .references(() => user.id),
  createdAt: timestamp('created_at', { mode: 'string' }).notNull().defaultNow(),
  updatedAt: timestamp('updated_at', { mode: 'string' }).notNull().defaultNow(),
});

export const addressRelations = relations(address, ({ one, many }) => ({
  user: one(user, { fields: [address.userId], references: [user.id] }),
  orders: many(order),
}));

export default address;
