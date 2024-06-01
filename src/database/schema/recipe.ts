import {
  bigint,
  boolean,
  decimal,
  mysqlTable,
  text,
  timestamp,
  varchar,
} from 'drizzle-orm/mysql-core';
import { relations, sql } from 'drizzle-orm';
import user from './user';
import category from './category';
import recipeImage from './recipe_image';
import orderRecipe from './order_recipe';
import review from './review';

const recipe = mysqlTable('recipe', {
  id: varchar('id', { length: 255 })
    .primaryKey()
    .unique()
    .default(sql`(uuid())`),
  title: varchar('title', { length: 255 }).notNull(),
  description: text('description').notNull(),
  price: decimal('price').notNull(),
  preparationTimeInSeconds: bigint('preparation_time_in_seconds', {
    mode: 'number',
  }).notNull(),
  availability: boolean('availability').notNull(),
  chiefId: varchar('chief_id', { length: 255 })
    .notNull()
    .references(() => user.id),

  categoryId: varchar('category_id', { length: 255 })
    .notNull()
    .references(() => category.id),
  createdAt: timestamp('created_at', { mode: 'string' }).notNull().defaultNow(),
  updatedAt: timestamp('updated_at', { mode: 'string' }).notNull().defaultNow(),
});

export const recipeRelations = relations(recipe, ({ one, many }) => ({
  chief: one(user, { fields: [recipe.chiefId], references: [user.id] }),
  category: one(category, {
    fields: [recipe.categoryId],
    references: [category.id],
  }),
  images: many(recipeImage),
  orderRecipes: many(orderRecipe),
  reviews: many(review),
}));

export default recipe;
