import { MigrationInterface, QueryRunner } from 'typeorm';

export class FixOtbIssue1718397032130 implements MigrationInterface {
  name = 'FixOtbIssue1718397032130';

  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(`DROP INDEX \`IDX_41850fba963c9bd82c16c6f6e8\` ON \`users\``);
    await queryRunner.query(
      `ALTER TABLE \`users\` CHANGE \`PhoneNumber\` \`phoneNumber\` varchar(255) NOT NULL`,
    );
    await queryRunner.query(`ALTER TABLE \`users\` DROP COLUMN \`phoneNumber\``);
    await queryRunner.query(`ALTER TABLE \`users\` ADD \`phoneNumber\` varchar(255) NOT NULL`);
    await queryRunner.query(
      `ALTER TABLE \`users\` ADD UNIQUE INDEX \`IDX_1e3d0240b49c40521aaeb95329\` (\`phoneNumber\`)`,
    );
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(`ALTER TABLE \`users\` DROP INDEX \`IDX_1e3d0240b49c40521aaeb95329\``);
    await queryRunner.query(`ALTER TABLE \`users\` DROP COLUMN \`phoneNumber\``);
    await queryRunner.query(`ALTER TABLE \`users\` ADD \`phoneNumber\` varchar(255) NOT NULL`);
    await queryRunner.query(
      `ALTER TABLE \`users\` CHANGE \`phoneNumber\` \`PhoneNumber\` varchar(255) NOT NULL`,
    );
    await queryRunner.query(
      `CREATE UNIQUE INDEX \`IDX_41850fba963c9bd82c16c6f6e8\` ON \`users\` (\`PhoneNumber\`)`,
    );
  }
}
