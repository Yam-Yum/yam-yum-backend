import { MigrationInterface, QueryRunner } from "typeorm";

export class RecipeSchema1720366306421 implements MigrationInterface {
    name = 'RecipeSchema1720366306421'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`CREATE TABLE \`recipe_image\` (\`url\` varchar(255) NOT NULL, \`recipeId\` varchar(36) NULL, PRIMARY KEY (\`url\`)) ENGINE=InnoDB`);
        await queryRunner.query(`CREATE TABLE \`recipe_videos\` (\`url\` varchar(255) NOT NULL, PRIMARY KEY (\`url\`)) ENGINE=InnoDB`);
        await queryRunner.query(`CREATE TABLE \`recipe\` (\`id\` varchar(36) NOT NULL, \`title\` varchar(255) NOT NULL, \`description\` text NOT NULL, \`preparationTimeInMinutes\` double NOT NULL, \`size\` enum ('Small', 'Medium', 'Large', 'ExtraLarge') NOT NULL DEFAULT 'Small', \`price\` double NOT NULL, \`status\` enum ('Draft', 'PendingApproval', 'Approved', 'Rejected', 'Inactive', 'Archived') NOT NULL DEFAULT 'Draft', \`createdAt\` datetime(6) NOT NULL DEFAULT CURRENT_TIMESTAMP(6), \`updatedAt\` datetime(6) NOT NULL DEFAULT CURRENT_TIMESTAMP(6) ON UPDATE CURRENT_TIMESTAMP(6), \`recipeVideoId\` varchar(255) NULL, \`categoryId\` varchar(36) NULL, \`authorId\` varchar(36) NULL, UNIQUE INDEX \`IDX_52f467a1124f1861bdaf15d14e\` (\`title\`), UNIQUE INDEX \`REL_1441be3339c629ee634b70078d\` (\`recipeVideoId\`), PRIMARY KEY (\`id\`)) ENGINE=InnoDB`);
        await queryRunner.query(`ALTER TABLE \`recipe_image\` ADD CONSTRAINT \`FK_d1130c698254134c0cd22507b97\` FOREIGN KEY (\`recipeId\`) REFERENCES \`recipe\`(\`id\`) ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE \`recipe\` ADD CONSTRAINT \`FK_1441be3339c629ee634b70078d4\` FOREIGN KEY (\`recipeVideoId\`) REFERENCES \`recipe_videos\`(\`url\`) ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE \`recipe\` ADD CONSTRAINT \`FK_991484dd8189182dafe91e44413\` FOREIGN KEY (\`categoryId\`) REFERENCES \`categories\`(\`id\`) ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE \`recipe\` ADD CONSTRAINT \`FK_1370c876f9d4a525a45a9b50d81\` FOREIGN KEY (\`authorId\`) REFERENCES \`users\`(\`id\`) ON DELETE NO ACTION ON UPDATE NO ACTION`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE \`recipe\` DROP FOREIGN KEY \`FK_1370c876f9d4a525a45a9b50d81\``);
        await queryRunner.query(`ALTER TABLE \`recipe\` DROP FOREIGN KEY \`FK_991484dd8189182dafe91e44413\``);
        await queryRunner.query(`ALTER TABLE \`recipe\` DROP FOREIGN KEY \`FK_1441be3339c629ee634b70078d4\``);
        await queryRunner.query(`ALTER TABLE \`recipe_image\` DROP FOREIGN KEY \`FK_d1130c698254134c0cd22507b97\``);
        await queryRunner.query(`DROP INDEX \`REL_1441be3339c629ee634b70078d\` ON \`recipe\``);
        await queryRunner.query(`DROP INDEX \`IDX_52f467a1124f1861bdaf15d14e\` ON \`recipe\``);
        await queryRunner.query(`DROP TABLE \`recipe\``);
        await queryRunner.query(`DROP TABLE \`recipe_videos\``);
        await queryRunner.query(`DROP TABLE \`recipe_image\``);
    }

}
