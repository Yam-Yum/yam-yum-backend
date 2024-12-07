import { MigrationInterface, QueryRunner } from 'typeorm';

export class BusinessProfileRequestRealationFix1733581755420 implements MigrationInterface {
  name = 'BusinessProfileRequestRealationFix1733581755420';

  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(
      `ALTER TABLE \`business_profile_request\` DROP FOREIGN KEY \`FK_5979f00771d416e430df386ea47\``,
    );
    await queryRunner.query(
      `ALTER TABLE \`business_profile_request\` ADD UNIQUE INDEX \`IDX_5979f00771d416e430df386ea4\` (\`userId\`)`,
    );
    await queryRunner.query(
      `CREATE UNIQUE INDEX \`REL_5979f00771d416e430df386ea4\` ON \`business_profile_request\` (\`userId\`)`,
    );
    await queryRunner.query(
      `ALTER TABLE \`business_profile_request\` ADD CONSTRAINT \`FK_5979f00771d416e430df386ea47\` FOREIGN KEY (\`userId\`) REFERENCES \`users\`(\`id\`) ON DELETE NO ACTION ON UPDATE NO ACTION`,
    );
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(
      `ALTER TABLE \`business_profile_request\` DROP FOREIGN KEY \`FK_5979f00771d416e430df386ea47\``,
    );
    await queryRunner.query(
      `DROP INDEX \`REL_5979f00771d416e430df386ea4\` ON \`business_profile_request\``,
    );
    await queryRunner.query(
      `ALTER TABLE \`business_profile_request\` DROP INDEX \`IDX_5979f00771d416e430df386ea4\``,
    );
    await queryRunner.query(
      `ALTER TABLE \`business_profile_request\` ADD CONSTRAINT \`FK_5979f00771d416e430df386ea47\` FOREIGN KEY (\`userId\`) REFERENCES \`users\`(\`id\`) ON DELETE NO ACTION ON UPDATE NO ACTION`,
    );
  }
}
