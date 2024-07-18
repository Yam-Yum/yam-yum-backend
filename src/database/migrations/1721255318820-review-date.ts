import { MigrationInterface, QueryRunner } from "typeorm";

export class ReviewDate1721255318820 implements MigrationInterface {
    name = 'ReviewDate1721255318820'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE \`review\` ADD \`createdAt\` datetime(6) NOT NULL DEFAULT CURRENT_TIMESTAMP(6)`);
        await queryRunner.query(`ALTER TABLE \`review\` ADD \`updatedAt\` datetime(6) NOT NULL DEFAULT CURRENT_TIMESTAMP(6) ON UPDATE CURRENT_TIMESTAMP(6)`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE \`review\` DROP COLUMN \`updatedAt\``);
        await queryRunner.query(`ALTER TABLE \`review\` DROP COLUMN \`createdAt\``);
    }

}
