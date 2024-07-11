import { MigrationInterface, QueryRunner } from "typeorm";

export class ImageRecipeVideoFix1720702429342 implements MigrationInterface {
    name = 'ImageRecipeVideoFix1720702429342'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE \`recipe\` DROP FOREIGN KEY \`FK_1441be3339c629ee634b70078d4\``);
        await queryRunner.query(`DROP INDEX \`REL_1441be3339c629ee634b70078d\` ON \`recipe\``);
        await queryRunner.query(`ALTER TABLE \`recipe_image\` DROP PRIMARY KEY`);
        await queryRunner.query(`ALTER TABLE \`recipe_image\` DROP COLUMN \`url\``);
        await queryRunner.query(`ALTER TABLE \`recipe_videos\` DROP PRIMARY KEY`);
        await queryRunner.query(`ALTER TABLE \`recipe_videos\` DROP COLUMN \`url\``);
        await queryRunner.query(`ALTER TABLE \`recipe_image\` ADD \`id\` varchar(36) NOT NULL PRIMARY KEY`);
        await queryRunner.query(`ALTER TABLE \`recipe_image\` ADD \`name\` varchar(255) NOT NULL`);
        await queryRunner.query(`ALTER TABLE \`recipe_image\` DROP PRIMARY KEY`);
        await queryRunner.query(`ALTER TABLE \`recipe_image\` ADD PRIMARY KEY (\`id\`, \`name\`)`);
        await queryRunner.query(`ALTER TABLE \`recipe_videos\` ADD \`id\` varchar(36) NOT NULL PRIMARY KEY`);
        await queryRunner.query(`ALTER TABLE \`recipe_videos\` ADD \`name\` varchar(255) NOT NULL`);
        await queryRunner.query(`ALTER TABLE \`recipe_videos\` DROP PRIMARY KEY`);
        await queryRunner.query(`ALTER TABLE \`recipe_videos\` ADD PRIMARY KEY (\`id\`, \`name\`)`);
        await queryRunner.query(`ALTER TABLE \`recipe\` DROP COLUMN \`recipeVideoId\``);
        await queryRunner.query(`ALTER TABLE \`recipe\` ADD \`recipeVideoId\` varchar(36) NULL`);
        await queryRunner.query(`CREATE UNIQUE INDEX \`REL_67c9efa90c0cfb8c96cc257f3d\` ON \`recipe\` (\`recipeVideoId\`, \`recipeVideoId\`)`);
        await queryRunner.query(`ALTER TABLE \`recipe\` ADD CONSTRAINT \`FK_67c9efa90c0cfb8c96cc257f3d5\` FOREIGN KEY (\`recipeVideoId\`, \`recipeVideoId\`) REFERENCES \`recipe_videos\`(\`id\`,\`name\`) ON DELETE NO ACTION ON UPDATE NO ACTION`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE \`recipe\` DROP FOREIGN KEY \`FK_67c9efa90c0cfb8c96cc257f3d5\``);
        await queryRunner.query(`DROP INDEX \`REL_67c9efa90c0cfb8c96cc257f3d\` ON \`recipe\``);
        await queryRunner.query(`ALTER TABLE \`recipe\` DROP COLUMN \`recipeVideoId\``);
        await queryRunner.query(`ALTER TABLE \`recipe\` ADD \`recipeVideoId\` varchar(255) NULL`);
        await queryRunner.query(`ALTER TABLE \`recipe_videos\` DROP PRIMARY KEY`);
        await queryRunner.query(`ALTER TABLE \`recipe_videos\` ADD PRIMARY KEY (\`id\`)`);
        await queryRunner.query(`ALTER TABLE \`recipe_videos\` DROP COLUMN \`name\``);
        await queryRunner.query(`ALTER TABLE \`recipe_videos\` DROP COLUMN \`id\``);
        await queryRunner.query(`ALTER TABLE \`recipe_image\` DROP PRIMARY KEY`);
        await queryRunner.query(`ALTER TABLE \`recipe_image\` ADD PRIMARY KEY (\`id\`)`);
        await queryRunner.query(`ALTER TABLE \`recipe_image\` DROP COLUMN \`name\``);
        await queryRunner.query(`ALTER TABLE \`recipe_image\` DROP COLUMN \`id\``);
        await queryRunner.query(`ALTER TABLE \`recipe_videos\` ADD \`url\` varchar(255) NOT NULL`);
        await queryRunner.query(`ALTER TABLE \`recipe_videos\` ADD PRIMARY KEY (\`url\`)`);
        await queryRunner.query(`ALTER TABLE \`recipe_image\` ADD \`url\` varchar(255) NOT NULL`);
        await queryRunner.query(`ALTER TABLE \`recipe_image\` ADD PRIMARY KEY (\`url\`)`);
        await queryRunner.query(`CREATE UNIQUE INDEX \`REL_1441be3339c629ee634b70078d\` ON \`recipe\` (\`recipeVideoId\`)`);
        await queryRunner.query(`ALTER TABLE \`recipe\` ADD CONSTRAINT \`FK_1441be3339c629ee634b70078d4\` FOREIGN KEY (\`recipeVideoId\`) REFERENCES \`recipe_videos\`(\`url\`) ON DELETE NO ACTION ON UPDATE NO ACTION`);
    }

}
