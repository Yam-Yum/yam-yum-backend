import { mysqlTable, timestamp, unique, varchar } from 'drizzle-orm/mysql-core';
import { relations, sql } from 'drizzle-orm';
import order from './order';
import recipe from './recipe';

const orderRecipe = mysqlTable(
  'order_recipe',
  {
    id: varchar('id', { length: 255 })
      .primaryKey()
      .unique()
      .default(sql`(uuid())`),
    orderId: varchar('order_id', { length: 255 })
      .notNull()
      .references(() => order.id),
    recipeId: varchar('recipe_id', { length: 255 })
      .notNull()
      .references(() => recipe.id),
    createdAt: timestamp('created_at', { mode: 'string' })
      .notNull()
      .defaultNow(),
    updatedAt: timestamp('updated_at', { mode: 'string' })
      .notNull()
      .defaultNow(),
  },
  (table) => {
    return {
      uniqueOrderRecipe: unique().on(table.orderId, table.recipeId),
    };
  },
);

export const orderRecipeRelations = relations(orderRecipe, ({ one }) => ({
  order: one(order, {
    fields: [orderRecipe.orderId],
    references: [order.id],
  }),
  recipe: one(recipe, {
    fields: [orderRecipe.recipeId],
    references: [recipe.id],
  }),
}));

export default orderRecipe;
