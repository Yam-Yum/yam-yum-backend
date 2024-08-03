import { MigrationInterface, QueryRunner } from "typeorm";

export class Favorite1722632269517 implements MigrationInterface {
    name = 'Favorite1722632269517'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`CREATE TABLE \`favorite_items\` (\`id\` varchar(36) NOT NULL, \`favoriteId\` varchar(36) NULL, \`recipeId\` varchar(36) NULL, PRIMARY KEY (\`id\`)) ENGINE=InnoDB`);
        await queryRunner.query(`CREATE TABLE \`favorite\` (\`id\` varchar(36) NOT NULL, \`userId\` varchar(36) NULL, UNIQUE INDEX \`REL_83b775fdebbe24c29b2b5831f2\` (\`userId\`), PRIMARY KEY (\`id\`)) ENGINE=InnoDB`);
        await queryRunner.query(`ALTER TABLE \`favorite_items\` ADD CONSTRAINT \`FK_ac209e8dee48449b3495ed23b44\` FOREIGN KEY (\`favoriteId\`) REFERENCES \`favorite\`(\`id\`) ON DELETE CASCADE ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE \`favorite_items\` ADD CONSTRAINT \`FK_d2db0b342dde9228158028ad0d4\` FOREIGN KEY (\`recipeId\`) REFERENCES \`recipe\`(\`id\`) ON DELETE CASCADE ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE \`favorite\` ADD CONSTRAINT \`FK_83b775fdebbe24c29b2b5831f2d\` FOREIGN KEY (\`userId\`) REFERENCES \`users\`(\`id\`) ON DELETE NO ACTION ON UPDATE NO ACTION`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE \`favorite\` DROP FOREIGN KEY \`FK_83b775fdebbe24c29b2b5831f2d\``);
        await queryRunner.query(`ALTER TABLE \`favorite_items\` DROP FOREIGN KEY \`FK_d2db0b342dde9228158028ad0d4\``);
        await queryRunner.query(`ALTER TABLE \`favorite_items\` DROP FOREIGN KEY \`FK_ac209e8dee48449b3495ed23b44\``);
        await queryRunner.query(`DROP INDEX \`REL_83b775fdebbe24c29b2b5831f2\` ON \`favorite\``);
        await queryRunner.query(`DROP TABLE \`favorite\``);
        await queryRunner.query(`DROP TABLE \`favorite_items\``);
    }

}
