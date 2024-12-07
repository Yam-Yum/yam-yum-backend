import { MigrationInterface, QueryRunner } from 'typeorm';

export class BusinessProfileRequest1733535772484 implements MigrationInterface {
  name = 'BusinessProfileRequest1733535772484';

  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(
      `CREATE TABLE \`business_profile_request\` (\`id\` varchar(36) NOT NULL, \`business_email\` varchar(255) NOT NULL, \`status\` enum ('pending', 'approved', 'rejected') NOT NULL DEFAULT 'pending', \`submitted_at\` datetime(6) NOT NULL DEFAULT CURRENT_TIMESTAMP(6), \`reviewed_at\` datetime NULL, \`userId\` varchar(36) NOT NULL, PRIMARY KEY (\`id\`)) ENGINE=InnoDB`,
    );
    await queryRunner.query(
      `ALTER TABLE \`business_profile_request\` ADD CONSTRAINT \`FK_5979f00771d416e430df386ea47\` FOREIGN KEY (\`userId\`) REFERENCES \`users\`(\`id\`) ON DELETE NO ACTION ON UPDATE NO ACTION`,
    );
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(
      `ALTER TABLE \`business_profile_request\` DROP FOREIGN KEY \`FK_5979f00771d416e430df386ea47\``,
    );
    await queryRunner.query(`DROP TABLE \`business_profile_request\``);
  }
}
