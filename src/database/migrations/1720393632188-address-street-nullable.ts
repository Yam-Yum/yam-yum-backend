import { MigrationInterface, QueryRunner } from 'typeorm';

export class AddressStreetNullable1720393632188 implements MigrationInterface {
  name = 'AddressStreetNullable1720393632188';

  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(
      `ALTER TABLE \`address\` CHANGE \`street\` \`street\` varchar(255) NULL`,
    );
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(
      `ALTER TABLE \`address\` CHANGE \`street\` \`street\` varchar(255) NOT NULL`,
    );
  }
}
