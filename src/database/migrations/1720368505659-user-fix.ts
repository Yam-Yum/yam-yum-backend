import { MigrationInterface, QueryRunner } from "typeorm";

export class UserFix1720368505659 implements MigrationInterface {
    name = 'UserFix1720368505659'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE \`users\` CHANGE \`username\` \`username\` varchar(255) NULL`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE \`users\` CHANGE \`username\` \`username\` varchar(255) NOT NULL`);
    }

}
