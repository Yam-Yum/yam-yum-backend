import { MigrationInterface, QueryRunner } from 'typeorm';

export class LikeVideo1722613046434 implements MigrationInterface {
  name = 'LikeVideo1722613046434';

  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(
      `CREATE TABLE \`likes\` (\`id\` varchar(36) NOT NULL, \`createdAt\` datetime(6) NOT NULL DEFAULT CURRENT_TIMESTAMP(6), \`updatedAt\` datetime(6) NOT NULL DEFAULT CURRENT_TIMESTAMP(6) ON UPDATE CURRENT_TIMESTAMP(6), \`videoId\` varchar(36) NULL, \`userId\` varchar(36) NULL, UNIQUE INDEX \`IDX_33565ef5d74ca26a9120aa44a6\` (\`videoId\`, \`userId\`), PRIMARY KEY (\`id\`)) ENGINE=InnoDB`,
    );
    await queryRunner.query(`ALTER TABLE \`recipe_videos\` ADD \`likesCount\` int NOT NULL`);
    await queryRunner.query(
      `ALTER TABLE \`likes\` ADD CONSTRAINT \`FK_5048b180fe14b1e90b4baae2762\` FOREIGN KEY (\`videoId\`) REFERENCES \`recipe_videos\`(\`id\`) ON DELETE NO ACTION ON UPDATE NO ACTION`,
    );
    await queryRunner.query(
      `ALTER TABLE \`likes\` ADD CONSTRAINT \`FK_cfd8e81fac09d7339a32e57d904\` FOREIGN KEY (\`userId\`) REFERENCES \`users\`(\`id\`) ON DELETE NO ACTION ON UPDATE NO ACTION`,
    );
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(
      `ALTER TABLE \`likes\` DROP FOREIGN KEY \`FK_cfd8e81fac09d7339a32e57d904\``,
    );
    await queryRunner.query(
      `ALTER TABLE \`likes\` DROP FOREIGN KEY \`FK_5048b180fe14b1e90b4baae2762\``,
    );
    await queryRunner.query(`ALTER TABLE \`recipe_videos\` DROP COLUMN \`likesCount\``);
    await queryRunner.query(`DROP INDEX \`IDX_33565ef5d74ca26a9120aa44a6\` ON \`likes\``);
    await queryRunner.query(`DROP TABLE \`likes\``);
  }
}
