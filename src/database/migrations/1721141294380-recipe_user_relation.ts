import { MigrationInterface, QueryRunner } from "typeorm";

export class RecipeUserRelation1721141294380 implements MigrationInterface {
    name = 'RecipeUserRelation1721141294380'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`DROP INDEX \`IDX_a322c5517e09c5c149c39c82d1\` ON \`recipe_videos\``);
        await queryRunner.query(`ALTER TABLE \`recipe\` ADD \`authorId\` varchar(36) NULL`);
        await queryRunner.query(`ALTER TABLE \`recipe\` ADD CONSTRAINT \`FK_1370c876f9d4a525a45a9b50d81\` FOREIGN KEY (\`authorId\`) REFERENCES \`users\`(\`id\`) ON DELETE NO ACTION ON UPDATE NO ACTION`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE \`recipe\` DROP FOREIGN KEY \`FK_1370c876f9d4a525a45a9b50d81\``);
        await queryRunner.query(`ALTER TABLE \`recipe\` DROP COLUMN \`authorId\``);
        await queryRunner.query(`CREATE UNIQUE INDEX \`IDX_a322c5517e09c5c149c39c82d1\` ON \`recipe_videos\` (\`recipeId\`)`);
    }

}
