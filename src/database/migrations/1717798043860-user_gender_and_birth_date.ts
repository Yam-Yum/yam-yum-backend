import { MigrationInterface, QueryRunner } from 'typeorm';

export class UserGenderAndBirthDate1717798043860 implements MigrationInterface {
  name = 'UserGenderAndBirthDate1717798043860';

  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(
      `ALTER TABLE \`users\` ADD \`gender\` enum ('male', 'female') NOT NULL DEFAULT 'male'`,
    );
    await queryRunner.query(`ALTER TABLE \`users\` ADD \`dateOfBirth\` datetime NOT NULL`);
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(`ALTER TABLE \`users\` DROP COLUMN \`dateOfBirth\``);
    await queryRunner.query(`ALTER TABLE \`users\` DROP COLUMN \`gender\``);
  }
}
