import { MigrationInterface, QueryRunner } from "typeorm";

export class RecipeOrderCount1721341814855 implements MigrationInterface {
    name = 'RecipeOrderCount1721341814855'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE \`recipe\` ADD \`orderCount\` int NOT NULL`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE \`recipe\` DROP COLUMN \`orderCount\``);
    }

}
