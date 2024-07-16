import { MigrationInterface, QueryRunner } from "typeorm";

export class RecipeImagesVideoRelations1721141115119 implements MigrationInterface {
    name = 'RecipeImagesVideoRelations1721141115119'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE \`recipe_image\` ADD \`recipeId\` varchar(36) NULL`);
        await queryRunner.query(`ALTER TABLE \`recipe_videos\` ADD \`recipeId\` varchar(36) NULL`);
        await queryRunner.query(`ALTER TABLE \`recipe_videos\` ADD UNIQUE INDEX \`IDX_a322c5517e09c5c149c39c82d1\` (\`recipeId\`)`);
        await queryRunner.query(`CREATE UNIQUE INDEX \`REL_a322c5517e09c5c149c39c82d1\` ON \`recipe_videos\` (\`recipeId\`)`);
        await queryRunner.query(`ALTER TABLE \`recipe_image\` ADD CONSTRAINT \`FK_d1130c698254134c0cd22507b97\` FOREIGN KEY (\`recipeId\`) REFERENCES \`recipe\`(\`id\`) ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE \`recipe_videos\` ADD CONSTRAINT \`FK_a322c5517e09c5c149c39c82d1c\` FOREIGN KEY (\`recipeId\`) REFERENCES \`recipe\`(\`id\`) ON DELETE NO ACTION ON UPDATE NO ACTION`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE \`recipe_videos\` DROP FOREIGN KEY \`FK_a322c5517e09c5c149c39c82d1c\``);
        await queryRunner.query(`ALTER TABLE \`recipe_image\` DROP FOREIGN KEY \`FK_d1130c698254134c0cd22507b97\``);
        await queryRunner.query(`DROP INDEX \`REL_a322c5517e09c5c149c39c82d1\` ON \`recipe_videos\``);
        await queryRunner.query(`ALTER TABLE \`recipe_videos\` DROP INDEX \`IDX_a322c5517e09c5c149c39c82d1\``);
        await queryRunner.query(`ALTER TABLE \`recipe_videos\` DROP COLUMN \`recipeId\``);
        await queryRunner.query(`ALTER TABLE \`recipe_image\` DROP COLUMN \`recipeId\``);
    }

}
