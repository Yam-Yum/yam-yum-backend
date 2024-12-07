import { MigrationInterface, QueryRunner } from "typeorm";

export class RecipeIngredients1733583017942 implements MigrationInterface {
    name = 'RecipeIngredients1733583017942'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`DROP INDEX \`IDX_5979f00771d416e430df386ea4\` ON \`business_profile_request\``);
        await queryRunner.query(`ALTER TABLE \`recipe\` ADD \`ingredients\` text NULL`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE \`recipe\` DROP COLUMN \`ingredients\``);
        await queryRunner.query(`CREATE UNIQUE INDEX \`IDX_5979f00771d416e430df386ea4\` ON \`business_profile_request\` (\`userId\`)`);
    }

}
