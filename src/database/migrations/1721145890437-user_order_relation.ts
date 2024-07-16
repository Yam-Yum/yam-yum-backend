import { MigrationInterface, QueryRunner } from 'typeorm';

export class UserOrderRelation1721145890437 implements MigrationInterface {
  name = 'UserOrderRelation1721145890437';

  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(`ALTER TABLE \`orders\` ADD \`userId\` varchar(36) NULL`);
    await queryRunner.query(
      `ALTER TABLE \`orders\` ADD CONSTRAINT \`FK_151b79a83ba240b0cb31b2302d1\` FOREIGN KEY (\`userId\`) REFERENCES \`users\`(\`id\`) ON DELETE NO ACTION ON UPDATE NO ACTION`,
    );
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(
      `ALTER TABLE \`orders\` DROP FOREIGN KEY \`FK_151b79a83ba240b0cb31b2302d1\``,
    );
    await queryRunner.query(`ALTER TABLE \`orders\` DROP COLUMN \`userId\``);
  }
}
