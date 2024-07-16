import { MigrationInterface, QueryRunner } from "typeorm";

export class OrderAddressRelation1721143506744 implements MigrationInterface {
    name = 'OrderAddressRelation1721143506744'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE \`orders\` ADD \`addressId\` varchar(36) NULL`);
        await queryRunner.query(`ALTER TABLE \`orders\` ADD CONSTRAINT \`FK_37636d260931dcf46d11892f614\` FOREIGN KEY (\`addressId\`) REFERENCES \`address\`(\`id\`) ON DELETE NO ACTION ON UPDATE NO ACTION`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE \`orders\` DROP FOREIGN KEY \`FK_37636d260931dcf46d11892f614\``);
        await queryRunner.query(`ALTER TABLE \`orders\` DROP COLUMN \`addressId\``);
    }

}
