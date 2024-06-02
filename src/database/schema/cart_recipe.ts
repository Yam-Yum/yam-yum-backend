import { mysqlTable, timestamp, unique, varchar } from 'drizzle-orm/mysql-core';
import { relations, sql } from 'drizzle-orm';
import recipe from './recipe';
import cart from './cart';

const cartRecipe = mysqlTable(
  'cart_recipe',
  {
    id: varchar('id', { length: 255 })
      .primaryKey()
      .unique()
      .default(sql`(uuid())`),
    cartId: varchar('cart_id', { length: 255 })
      .notNull()
      .references(() => cart.id),
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
  (table) => ({
    uniqueCartRecipe: unique().on(table.cartId, table.recipeId),
  }),
);

export const cartRecipeRelations = relations(cartRecipe, ({ one }) => ({
  cart: one(cart, { fields: [cartRecipe.cartId], references: [cart.id] }),
  recipe: one(recipe, {
    fields: [cartRecipe.recipeId],
    references: [recipe.id],
  }),
}));

export default cartRecipe;
