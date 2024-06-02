import { mysqlTable, timestamp, varchar } from 'drizzle-orm/mysql-core';
import { relations, sql } from 'drizzle-orm';
import recipe from './recipe';

const category = mysqlTable('category', {
  id: varchar('id', { length: 255 })
    .primaryKey()
    .unique()
    .default(sql`(uuid())`),
  name: varchar('name', { length: 255 }).notNull(),
  imageUrl: varchar('image_url', { length: 255 }).notNull(),
  createdAt: timestamp('created_at', { mode: 'string' }).notNull().defaultNow(),
  updatedAt: timestamp('updated_at', { mode: 'string' }).notNull().defaultNow(),
});

export const categoryRelations = relations(category, ({ many }) => ({
  recipes: many(recipe),
}));

export default category;
