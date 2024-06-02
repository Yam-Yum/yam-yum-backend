import {
  int,
  mysqlTable,
  timestamp,
  varchar,
  text,
} from 'drizzle-orm/mysql-core';
import { relations, sql } from 'drizzle-orm';
import recipe from './recipe';
import user from './user';

const review = mysqlTable('review', {
  id: varchar('id', { length: 255 })
    .primaryKey()
    .unique()
    .default(sql`(uuid())`),
  comment: text('comment').notNull(),
  rating: int('rating', { unsigned: true }).notNull(),
  recipeId: varchar('recipe_id', { length: 255 })
    .notNull()
    .references(() => recipe.id),
  userId: varchar('user_id', { length: 255 })
    .notNull()
    .references(() => user.id),
  createdAt: timestamp('created_at', { mode: 'string' }).notNull().defaultNow(),
  updatedAt: timestamp('updated_at', { mode: 'string' }).notNull().defaultNow(),
});

export const reviewRelations = relations(review, ({ one }) => ({
  recipe: one(recipe, {
    fields: [review.recipeId],
    references: [recipe.id],
  }),
  user: one(user, {
    fields: [review.userId],
    references: [user.id],
  }),
}));

export default review;
