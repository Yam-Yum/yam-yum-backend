import { MigrationInterface, QueryRunner } from "typeorm";

export class UserAddressRelation1721140996435 implements MigrationInterface {
    name = 'UserAddressRelation1721140996435'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`DROP INDEX \`IDX_610102b60fea1455310ccd299d\` ON \`refresh_tokens\``);
        await queryRunner.query(`DROP INDEX \`IDX_61f0aacd415edcd3268eab0a4b\` ON \`phone_numbers\``);
        await queryRunner.query(`ALTER TABLE \`address\` ADD CONSTRAINT \`FK_d25f1ea79e282cc8a42bd616aa3\` FOREIGN KEY (\`userId\`) REFERENCES \`users\`(\`id\`) ON DELETE NO ACTION ON UPDATE NO ACTION`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE \`address\` DROP FOREIGN KEY \`FK_d25f1ea79e282cc8a42bd616aa3\``);
        await queryRunner.query(`CREATE UNIQUE INDEX \`IDX_61f0aacd415edcd3268eab0a4b\` ON \`phone_numbers\` (\`userId\`)`);
        await queryRunner.query(`CREATE UNIQUE INDEX \`IDX_610102b60fea1455310ccd299d\` ON \`refresh_tokens\` (\`userId\`)`);
    }

}
