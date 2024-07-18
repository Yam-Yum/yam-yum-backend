import { MigrationInterface, QueryRunner } from "typeorm";

export class ImageNameAndVideoNameRemoveUnique1721327317474 implements MigrationInterface {
    name = 'ImageNameAndVideoNameRemoveUnique1721327317474'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`DROP INDEX \`IDX_9c1fcc597ac2cbc5b85d40dcae\` ON \`recipe_image\``);
        await queryRunner.query(`DROP INDEX \`IDX_fa131c258dab652065b4e7e5be\` ON \`recipe_videos\``);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`CREATE UNIQUE INDEX \`IDX_fa131c258dab652065b4e7e5be\` ON \`recipe_videos\` (\`videoName\`)`);
        await queryRunner.query(`CREATE UNIQUE INDEX \`IDX_9c1fcc597ac2cbc5b85d40dcae\` ON \`recipe_image\` (\`imageName\`)`);
    }

}
