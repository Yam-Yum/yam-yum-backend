import { mysqlTable, timestamp, varchar } from 'drizzle-orm/mysql-core';
import { relations, sql } from 'drizzle-orm';
import recipe from './recipe';

const recipeImage = mysqlTable('recipe_image', {
  id: varchar('id', { length: 255 })
    .primaryKey()
    .unique()
    .default(sql`(uuid())`),
  imageUrl: varchar('image_url', { length: 255 }).notNull(),
  recipeId: varchar('recipe_id', { length: 255 })
    .notNull()
    .references(() => recipe.id),
  createdAt: timestamp('created_at', { mode: 'string' }).notNull().defaultNow(),
  updatedAt: timestamp('updated_at', { mode: 'string' }).notNull().defaultNow(),
});

export const recipeImageRelations = relations(recipeImage, ({ one }) => ({
  recipe: one(recipe, {
    fields: [recipeImage.recipeId],
    references: [recipe.id],
  }),
}));

export default recipeImage;
