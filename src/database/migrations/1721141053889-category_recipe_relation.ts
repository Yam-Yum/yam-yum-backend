import { MigrationInterface, QueryRunner } from "typeorm";

export class CategoryRecipeRelation1721141053889 implements MigrationInterface {
    name = 'CategoryRecipeRelation1721141053889'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE \`recipe\` ADD \`categoryId\` varchar(36) NULL`);
        await queryRunner.query(`ALTER TABLE \`recipe\` ADD CONSTRAINT \`FK_991484dd8189182dafe91e44413\` FOREIGN KEY (\`categoryId\`) REFERENCES \`categories\`(\`id\`) ON DELETE NO ACTION ON UPDATE NO ACTION`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE \`recipe\` DROP FOREIGN KEY \`FK_991484dd8189182dafe91e44413\``);
        await queryRunner.query(`ALTER TABLE \`recipe\` DROP COLUMN \`categoryId\``);
    }

}
