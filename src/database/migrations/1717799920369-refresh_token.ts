import { MigrationInterface, QueryRunner } from 'typeorm';

export class RefreshToken1717799920369 implements MigrationInterface {
  name = 'RefreshToken1717799920369';

  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(
      `CREATE TABLE \`refresh_tokens\` (\`id\` varchar(36) NOT NULL, \`refreshToken\` varchar(255) NOT NULL, \`expirationDate\` datetime NOT NULL, \`userId\` varchar(36) NULL, UNIQUE INDEX \`IDX_84519890ff1135ab93aba6546f\` (\`refreshToken\`), UNIQUE INDEX \`REL_610102b60fea1455310ccd299d\` (\`userId\`), PRIMARY KEY (\`id\`)) ENGINE=InnoDB`,
    );
    await queryRunner.query(
      `ALTER TABLE \`refresh_tokens\` ADD CONSTRAINT \`FK_610102b60fea1455310ccd299de\` FOREIGN KEY (\`userId\`) REFERENCES \`users\`(\`id\`) ON DELETE NO ACTION ON UPDATE NO ACTION`,
    );
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(
      `ALTER TABLE \`refresh_tokens\` DROP FOREIGN KEY \`FK_610102b60fea1455310ccd299de\``,
    );
    await queryRunner.query(`DROP INDEX \`REL_610102b60fea1455310ccd299d\` ON \`refresh_tokens\``);
    await queryRunner.query(`DROP INDEX \`IDX_84519890ff1135ab93aba6546f\` ON \`refresh_tokens\``);
    await queryRunner.query(`DROP TABLE \`refresh_tokens\``);
  }
}
