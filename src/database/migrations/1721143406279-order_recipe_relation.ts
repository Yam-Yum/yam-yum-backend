import { MigrationInterface, QueryRunner } from 'typeorm';

export class OrderRecipeRelation1721143406279 implements MigrationInterface {
  name = 'OrderRecipeRelation1721143406279';

  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(
      `CREATE TABLE \`recipe_orders_orders\` (\`recipeId\` varchar(36) NOT NULL, \`ordersId\` varchar(36) NOT NULL, INDEX \`IDX_70b819af68b902833d3bf01f9a\` (\`recipeId\`), INDEX \`IDX_78c7ba62061b0994c92979a438\` (\`ordersId\`), PRIMARY KEY (\`recipeId\`, \`ordersId\`)) ENGINE=InnoDB`,
    );
    await queryRunner.query(
      `ALTER TABLE \`recipe_orders_orders\` ADD CONSTRAINT \`FK_70b819af68b902833d3bf01f9a0\` FOREIGN KEY (\`recipeId\`) REFERENCES \`recipe\`(\`id\`) ON DELETE CASCADE ON UPDATE CASCADE`,
    );
    await queryRunner.query(
      `ALTER TABLE \`recipe_orders_orders\` ADD CONSTRAINT \`FK_78c7ba62061b0994c92979a4388\` FOREIGN KEY (\`ordersId\`) REFERENCES \`orders\`(\`id\`) ON DELETE NO ACTION ON UPDATE NO ACTION`,
    );
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(
      `ALTER TABLE \`recipe_orders_orders\` DROP FOREIGN KEY \`FK_78c7ba62061b0994c92979a4388\``,
    );
    await queryRunner.query(
      `ALTER TABLE \`recipe_orders_orders\` DROP FOREIGN KEY \`FK_70b819af68b902833d3bf01f9a0\``,
    );
    await queryRunner.query(
      `DROP INDEX \`IDX_78c7ba62061b0994c92979a438\` ON \`recipe_orders_orders\``,
    );
    await queryRunner.query(
      `DROP INDEX \`IDX_70b819af68b902833d3bf01f9a\` ON \`recipe_orders_orders\``,
    );
    await queryRunner.query(`DROP TABLE \`recipe_orders_orders\``);
  }
}
