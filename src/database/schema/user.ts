import {
  mysqlEnum,
  mysqlTable,
  timestamp,
  varchar,
} from 'drizzle-orm/mysql-core';
import { relations, sql } from 'drizzle-orm';
import address from './address';
import cart from './cart';
import recipe from './recipe';
import wallet from './wallet';

const user = mysqlTable('users', {
  id: varchar('id', { length: 255 })
    .primaryKey()
    .unique()
    .default(sql`(uuid())`),
  firstName: varchar('first_name', { length: 255 }).notNull(),
  lastName: varchar('last_name', { length: 255 }).notNull(),
  email: varchar('email', { length: 255 }).notNull().unique(),
  password: varchar('password', { length: 255 }).notNull(),
  phoneNumber: varchar('phone_number', { length: 255 }).notNull().unique(),
  profilePicture: varchar('profile_picture', { length: 255 }),
  dateOfBirth: timestamp('date_of_birth', { mode: 'string' }).notNull(),
  gender: mysqlEnum('gender', ['male', 'female']).notNull(),
  role: mysqlEnum('role', ['guest', 'chief', 'client', 'admin']).notNull(),
  createdAt: timestamp('created_at', { mode: 'string' }).notNull().defaultNow(),
  updatedAt: timestamp('updated_at', { mode: 'string' }).notNull().defaultNow(),
});

export const userRelations = relations(user, ({ one, many }) => ({
  addresses: many(address),
  recipes: many(recipe),
  cart: one(cart),
  orders: many(recipe),
  reviews: many(recipe),
  wallet: one(wallet),
}));

export default user;
