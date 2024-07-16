import { MigrationInterface, QueryRunner } from "typeorm";

export class RecipeCartItemRelation1721142079522 implements MigrationInterface {
    name = 'RecipeCartItemRelation1721142079522'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`DROP INDEX \`IDX_756f53ab9466eb52a52619ee01\` ON \`cart\``);
        await queryRunner.query(`ALTER TABLE \`cart_items\` ADD \`recipeId\` varchar(36) NULL`);
        await queryRunner.query(`ALTER TABLE \`cart_items\` ADD CONSTRAINT \`FK_82b9bab62f3edd5a5badcb17aa6\` FOREIGN KEY (\`recipeId\`) REFERENCES \`recipe\`(\`id\`) ON DELETE NO ACTION ON UPDATE NO ACTION`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE \`cart_items\` DROP FOREIGN KEY \`FK_82b9bab62f3edd5a5badcb17aa6\``);
        await queryRunner.query(`ALTER TABLE \`cart_items\` DROP COLUMN \`recipeId\``);
        await queryRunner.query(`CREATE UNIQUE INDEX \`IDX_756f53ab9466eb52a52619ee01\` ON \`cart\` (\`userId\`)`);
    }

}
