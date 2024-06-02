import {
  double,
  mysqlEnum,
  mysqlTable,
  timestamp,
  varchar,
} from 'drizzle-orm/mysql-core';
import { relations, sql } from 'drizzle-orm';
import address from './address';
import user from './user';
import orderRecipe from './order_recipe';

const order = mysqlTable('order', {
  id: varchar('id', { length: 255 })
    .primaryKey()
    .unique()
    .default(sql`(uuid())`),
  status: mysqlEnum('status', [
    'placed',
    'preparing',
    'prepared',
    'delivered',
    'cancelled',
  ]).notNull(),
  paymentMethod: mysqlEnum('payment_method', ['cash', 'card']).notNull(),
  totalPrice: double('total_price', { scale: 2 }).notNull(),
  addressId: varchar('address_id', { length: 255 })
    .notNull()
    .references(() => address.id),
  userId: varchar('user_id', { length: 255 })
    .notNull()
    .references(() => user.id),
  createdAt: timestamp('created_at', { mode: 'string' }).notNull().defaultNow(),
  updatedAt: timestamp('updated_at', { mode: 'string' }).notNull().defaultNow(),
});

export const orderRelations = relations(order, ({ one, many }) => ({
  user: one(user, { fields: [order.userId], references: [user.id] }),
  address: one(address, {
    fields: [order.addressId],
    references: [address.id],
  }),
  orderRecipes: many(orderRecipe),
}));

export default order;
