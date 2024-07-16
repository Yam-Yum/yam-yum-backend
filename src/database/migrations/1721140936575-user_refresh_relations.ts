import { MigrationInterface, QueryRunner } from "typeorm";

export class UserRefreshRelations1721140936575 implements MigrationInterface {
    name = 'UserRefreshRelations1721140936575'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE \`phone_numbers\` ADD \`userId\` varchar(36) NULL`);
        await queryRunner.query(`ALTER TABLE \`phone_numbers\` ADD UNIQUE INDEX \`IDX_61f0aacd415edcd3268eab0a4b\` (\`userId\`)`);
        await queryRunner.query(`ALTER TABLE \`refresh_tokens\` ADD \`userId\` varchar(36) NULL`);
        await queryRunner.query(`ALTER TABLE \`refresh_tokens\` ADD UNIQUE INDEX \`IDX_610102b60fea1455310ccd299d\` (\`userId\`)`);
        await queryRunner.query(`CREATE UNIQUE INDEX \`REL_61f0aacd415edcd3268eab0a4b\` ON \`phone_numbers\` (\`userId\`)`);
        await queryRunner.query(`CREATE UNIQUE INDEX \`REL_610102b60fea1455310ccd299d\` ON \`refresh_tokens\` (\`userId\`)`);
        await queryRunner.query(`ALTER TABLE \`phone_numbers\` ADD CONSTRAINT \`FK_61f0aacd415edcd3268eab0a4b4\` FOREIGN KEY (\`userId\`) REFERENCES \`users\`(\`id\`) ON DELETE CASCADE ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE \`refresh_tokens\` ADD CONSTRAINT \`FK_610102b60fea1455310ccd299de\` FOREIGN KEY (\`userId\`) REFERENCES \`users\`(\`id\`) ON DELETE CASCADE ON UPDATE NO ACTION`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE \`refresh_tokens\` DROP FOREIGN KEY \`FK_610102b60fea1455310ccd299de\``);
        await queryRunner.query(`ALTER TABLE \`phone_numbers\` DROP FOREIGN KEY \`FK_61f0aacd415edcd3268eab0a4b4\``);
        await queryRunner.query(`DROP INDEX \`REL_610102b60fea1455310ccd299d\` ON \`refresh_tokens\``);
        await queryRunner.query(`DROP INDEX \`REL_61f0aacd415edcd3268eab0a4b\` ON \`phone_numbers\``);
        await queryRunner.query(`ALTER TABLE \`refresh_tokens\` DROP INDEX \`IDX_610102b60fea1455310ccd299d\``);
        await queryRunner.query(`ALTER TABLE \`refresh_tokens\` DROP COLUMN \`userId\``);
        await queryRunner.query(`ALTER TABLE \`phone_numbers\` DROP INDEX \`IDX_61f0aacd415edcd3268eab0a4b\``);
        await queryRunner.query(`ALTER TABLE \`phone_numbers\` DROP COLUMN \`userId\``);
    }

}
