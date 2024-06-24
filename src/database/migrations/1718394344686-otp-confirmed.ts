import { MigrationInterface, QueryRunner } from 'typeorm';

export class OtpConfirmed1718394344686 implements MigrationInterface {
  name = 'OtpConfirmed1718394344686';

  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(`ALTER TABLE \`phone_numbers\` ADD \`otpConfirmed\` tinyint NOT NULL`);
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(`ALTER TABLE \`phone_numbers\` DROP COLUMN \`otpConfirmed\``);
  }
}
