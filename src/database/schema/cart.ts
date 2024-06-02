import { double, mysqlTable, timestamp, varchar } from 'drizzle-orm/mysql-core';
import { relations, sql } from 'drizzle-orm';
import user from './user';
import cartRecipe from './cart_recipe';

const cart = mysqlTable('cart', {
  id: varchar('id', { length: 255 })
    .primaryKey()
    .unique()
    .default(sql`(uuid())`),
  totalPrice: double('total_price', { scale: 2 }).notNull(),
  userId: varchar('user_id', { length: 255 })
    .notNull()
    .references(() => user.id),
  createdAt: timestamp('created_at', { mode: 'string' }).notNull().defaultNow(),
  updatedAt: timestamp('updated_at', { mode: 'string' }).notNull().defaultNow(),
});

export const cartRelations = relations(cart, ({ one, many }) => ({
  user: one(user, { fields: [cart.userId], references: [user.id] }),
  recipes: many(cartRecipe),
}));

export default cart;
