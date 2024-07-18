import { MigrationInterface, QueryRunner } from "typeorm";

export class ReviewRename1721260256391 implements MigrationInterface {
    name = 'ReviewRename1721260256391'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`CREATE TABLE \`reviews\` (\`id\` varchar(36) NOT NULL, \`rating\` enum ('1', '2', '3', '4', '5') NOT NULL DEFAULT '5', \`comment\` text NOT NULL, \`createdAt\` datetime(6) NOT NULL DEFAULT CURRENT_TIMESTAMP(6), \`updatedAt\` datetime(6) NOT NULL DEFAULT CURRENT_TIMESTAMP(6) ON UPDATE CURRENT_TIMESTAMP(6), \`recipeId\` varchar(36) NULL, \`userId\` varchar(36) NULL, PRIMARY KEY (\`id\`)) ENGINE=InnoDB`);
        await queryRunner.query(`ALTER TABLE \`reviews\` ADD CONSTRAINT \`FK_7e3b53f4f1dc9c097ca33072bde\` FOREIGN KEY (\`recipeId\`) REFERENCES \`recipe\`(\`id\`) ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE \`reviews\` ADD CONSTRAINT \`FK_7ed5659e7139fc8bc039198cc1f\` FOREIGN KEY (\`userId\`) REFERENCES \`users\`(\`id\`) ON DELETE NO ACTION ON UPDATE NO ACTION`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE \`reviews\` DROP FOREIGN KEY \`FK_7ed5659e7139fc8bc039198cc1f\``);
        await queryRunner.query(`ALTER TABLE \`reviews\` DROP FOREIGN KEY \`FK_7e3b53f4f1dc9c097ca33072bde\``);
        await queryRunner.query(`DROP TABLE \`reviews\``);
    }

}
