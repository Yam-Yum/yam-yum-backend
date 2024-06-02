import { double, mysqlTable, timestamp, varchar } from 'drizzle-orm/mysql-core';
import { relations, sql } from 'drizzle-orm';
import user from './user';

const wallet = mysqlTable('wallet', {
  id: varchar('id', { length: 255 })
    .primaryKey()
    .unique()
    .default(sql`(uuid())`),
  balance: double('balance', { scale: 2 }).notNull().default(0),
  userId: varchar('user_id', { length: 255 })
    .notNull()
    .references(() => user.id),
  createdAt: timestamp('created_at', { mode: 'string' }).notNull().defaultNow(),
  updatedAt: timestamp('updated_at', { mode: 'string' }).notNull().defaultNow(),
});

export const walletRelations = relations(wallet, ({ one }) => ({
  user: one(user, {
    fields: [wallet.userId],
    references: [user.id],
  }),
}));

export default wallet;
