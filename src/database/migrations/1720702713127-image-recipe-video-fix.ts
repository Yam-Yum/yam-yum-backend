import { MigrationInterface, QueryRunner } from "typeorm";

export class ImageRecipeVideoFix1720702713127 implements MigrationInterface {
    name = 'ImageRecipeVideoFix1720702713127'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE \`recipe\` CHANGE \`recipeVideoId\` \`videoId\` varchar(255) NULL`);
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
        await queryRunner.query(`ALTER TABLE \`recipe\` DROP COLUMN \`videoId\``);
        await queryRunner.query(`ALTER TABLE \`recipe\` ADD \`videoId\` varchar(36) NULL`);
        await queryRunner.query(`CREATE UNIQUE INDEX \`REL_27da073e4fe478ee11f0cf5cea\` ON \`recipe\` (\`videoId\`, \`videoId\`)`);
        await queryRunner.query(`ALTER TABLE \`recipe\` ADD CONSTRAINT \`FK_27da073e4fe478ee11f0cf5ceaf\` FOREIGN KEY (\`videoId\`, \`videoId\`) REFERENCES \`recipe_videos\`(\`id\`,\`name\`) ON DELETE NO ACTION ON UPDATE NO ACTION`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE \`recipe\` DROP FOREIGN KEY \`FK_27da073e4fe478ee11f0cf5ceaf\``);
        await queryRunner.query(`DROP INDEX \`REL_27da073e4fe478ee11f0cf5cea\` ON \`recipe\``);
        await queryRunner.query(`ALTER TABLE \`recipe\` DROP COLUMN \`videoId\``);
        await queryRunner.query(`ALTER TABLE \`recipe\` ADD \`videoId\` varchar(255) NULL`);
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
        await queryRunner.query(`ALTER TABLE \`recipe\` CHANGE \`videoId\` \`recipeVideoId\` varchar(255) NULL`);
    }

}
