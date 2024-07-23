import { MigrationInterface, QueryRunner } from "typeorm";

export class OrderFix1721772285694 implements MigrationInterface {
    name = 'OrderFix1721772285694'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE \`orders\` ADD \`discount\` int NOT NULL`);
        await queryRunner.query(`ALTER TABLE \`orders\` ADD \`orderTotal\` float NOT NULL`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE \`orders\` DROP COLUMN \`orderTotal\``);
        await queryRunner.query(`ALTER TABLE \`orders\` DROP COLUMN \`discount\``);
    }

}
