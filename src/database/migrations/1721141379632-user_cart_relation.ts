import { MigrationInterface, QueryRunner } from 'typeorm';

export class UserCartRelation1721141379632 implements MigrationInterface {
  name = 'UserCartRelation1721141379632';

  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(`ALTER TABLE \`cart\` ADD \`userId\` varchar(36) NULL`);
    await queryRunner.query(
      `ALTER TABLE \`cart\` ADD UNIQUE INDEX \`IDX_756f53ab9466eb52a52619ee01\` (\`userId\`)`,
    );
    await queryRunner.query(
      `CREATE UNIQUE INDEX \`REL_756f53ab9466eb52a52619ee01\` ON \`cart\` (\`userId\`)`,
    );
    await queryRunner.query(
      `ALTER TABLE \`cart\` ADD CONSTRAINT \`FK_756f53ab9466eb52a52619ee019\` FOREIGN KEY (\`userId\`) REFERENCES \`users\`(\`id\`) ON DELETE CASCADE ON UPDATE NO ACTION`,
    );
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(
      `ALTER TABLE \`cart\` DROP FOREIGN KEY \`FK_756f53ab9466eb52a52619ee019\``,
    );
    await queryRunner.query(`DROP INDEX \`REL_756f53ab9466eb52a52619ee01\` ON \`cart\``);
    await queryRunner.query(`ALTER TABLE \`cart\` DROP INDEX \`IDX_756f53ab9466eb52a52619ee01\``);
    await queryRunner.query(`ALTER TABLE \`cart\` DROP COLUMN \`userId\``);
  }
}
