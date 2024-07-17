import { MigrationInterface, QueryRunner } from "typeorm";

export class Review1721251786450 implements MigrationInterface {
    name = 'Review1721251786450'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`CREATE TABLE \`review\` (\`id\` varchar(36) NOT NULL, \`rating\` enum ('1', '2', '3', '4', '5') NOT NULL DEFAULT '5', \`comment\` text NOT NULL, \`recipeId\` varchar(36) NULL, \`userId\` varchar(36) NULL, PRIMARY KEY (\`id\`)) ENGINE=InnoDB`);
        await queryRunner.query(`ALTER TABLE \`recipe\` ADD \`rate\` float NOT NULL`);
        await queryRunner.query(`ALTER TABLE \`review\` ADD CONSTRAINT \`FK_363630b6fbf4627b0ecfe12f371\` FOREIGN KEY (\`recipeId\`) REFERENCES \`recipe\`(\`id\`) ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE \`review\` ADD CONSTRAINT \`FK_1337f93918c70837d3cea105d39\` FOREIGN KEY (\`userId\`) REFERENCES \`users\`(\`id\`) ON DELETE NO ACTION ON UPDATE NO ACTION`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE \`review\` DROP FOREIGN KEY \`FK_1337f93918c70837d3cea105d39\``);
        await queryRunner.query(`ALTER TABLE \`review\` DROP FOREIGN KEY \`FK_363630b6fbf4627b0ecfe12f371\``);
        await queryRunner.query(`ALTER TABLE \`recipe\` DROP COLUMN \`rate\``);
        await queryRunner.query(`DROP TABLE \`review\``);
    }

}
