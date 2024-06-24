import { MigrationInterface, QueryRunner } from 'typeorm';

export class Category1718453489981 implements MigrationInterface {
  name = 'Category1718453489981';

  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(
      `ALTER TABLE \`categories\` ADD UNIQUE INDEX \`IDX_8b0be371d28245da6e4f4b6187\` (\`name\`)`,
    );
    await queryRunner.query(
      `ALTER TABLE \`categories\` CHANGE \`image\` \`image\` varchar(255) NULL`,
    );
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(
      `ALTER TABLE \`categories\` CHANGE \`image\` \`image\` varchar(255) NOT NULL`,
    );
    await queryRunner.query(
      `ALTER TABLE \`categories\` DROP INDEX \`IDX_8b0be371d28245da6e4f4b6187\``,
    );
  }
}
