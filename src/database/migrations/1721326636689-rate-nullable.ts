import { MigrationInterface, QueryRunner } from "typeorm";

export class RateNullable1721326636689 implements MigrationInterface {
    name = 'RateNullable1721326636689'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE \`recipe\` CHANGE \`rate\` \`rate\` float NULL`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE \`recipe\` CHANGE \`rate\` \`rate\` float NOT NULL`);
    }

}
