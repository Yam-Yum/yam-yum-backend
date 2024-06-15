import { MigrationInterface, QueryRunner } from 'typeorm';

export class Registration1718391215482 implements MigrationInterface {
  name = 'Registration1718391215482';

  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(`ALTER TABLE \`phone_numbers\` DROP COLUMN \`mostRecentOtp\``);
    await queryRunner.query(`ALTER TABLE \`users\` ADD \`PhoneNumber\` varchar(255) NOT NULL`);
    await queryRunner.query(
      `ALTER TABLE \`users\` ADD UNIQUE INDEX \`IDX_41850fba963c9bd82c16c6f6e8\` (\`PhoneNumber\`)`,
    );
    await queryRunner.query(`ALTER TABLE \`phone_numbers\` ADD \`otp\` varchar(255) NOT NULL`);
    await queryRunner.query(`ALTER TABLE \`phone_numbers\` ADD \`otpExpireIn\` datetime NOT NULL`);
    await queryRunner.query(
      `ALTER TABLE \`phone_numbers\` ADD \`verified\` tinyint NOT NULL DEFAULT 0`,
    );
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(`ALTER TABLE \`phone_numbers\` DROP COLUMN \`verified\``);
    await queryRunner.query(`ALTER TABLE \`phone_numbers\` DROP COLUMN \`otpExpireIn\``);
    await queryRunner.query(`ALTER TABLE \`phone_numbers\` DROP COLUMN \`otp\``);
    await queryRunner.query(`ALTER TABLE \`users\` DROP INDEX \`IDX_41850fba963c9bd82c16c6f6e8\``);
    await queryRunner.query(`ALTER TABLE \`users\` DROP COLUMN \`PhoneNumber\``);
    await queryRunner.query(
      `ALTER TABLE \`phone_numbers\` ADD \`mostRecentOtp\` varchar(255) NOT NULL`,
    );
  }
}
