import { MigrationInterface, QueryRunner } from "typeorm";

export class CategoryDeletedAt1722733030971 implements MigrationInterface {
    name = 'CategoryDeletedAt1722733030971'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE \`categories\` CHANGE \`isActive\` \`deletedAt\` tinyint NOT NULL DEFAULT '1'`);
        await queryRunner.query(`ALTER TABLE \`categories\` DROP COLUMN \`deletedAt\``);
        await queryRunner.query(`ALTER TABLE \`categories\` ADD \`deletedAt\` datetime(6) NULL`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE \`categories\` DROP COLUMN \`deletedAt\``);
        await queryRunner.query(`ALTER TABLE \`categories\` ADD \`deletedAt\` tinyint NOT NULL DEFAULT '1'`);
        await queryRunner.query(`ALTER TABLE \`categories\` CHANGE \`deletedAt\` \`isActive\` tinyint NOT NULL DEFAULT '1'`);
    }

}
