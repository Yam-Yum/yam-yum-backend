import { MigrationInterface, QueryRunner } from 'typeorm';

export class CartCartItemRelation1721142157948 implements MigrationInterface {
  name = 'CartCartItemRelation1721142157948';

  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(`ALTER TABLE \`cart_items\` ADD \`cartId\` varchar(36) NULL`);
    await queryRunner.query(
      `ALTER TABLE \`cart_items\` ADD CONSTRAINT \`FK_edd714311619a5ad09525045838\` FOREIGN KEY (\`cartId\`) REFERENCES \`cart\`(\`id\`) ON DELETE NO ACTION ON UPDATE NO ACTION`,
    );
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(
      `ALTER TABLE \`cart_items\` DROP FOREIGN KEY \`FK_edd714311619a5ad09525045838\``,
    );
    await queryRunner.query(`ALTER TABLE \`cart_items\` DROP COLUMN \`cartId\``);
  }
}
