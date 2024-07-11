import { MigrationInterface, QueryRunner } from "typeorm";

export class ImageRecipeRelationFix1720697086021 implements MigrationInterface {
    name = 'ImageRecipeRelationFix1720697086021'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE \`users\` CHANGE \`username\` \`username\` varchar(255) NULL`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE \`users\` CHANGE \`username\` \`username\` varchar(255) NOT NULL`);
    }

}
