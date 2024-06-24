import { MigrationInterface, QueryRunner } from 'typeorm';

export class UserPpIsNullable1718407379743 implements MigrationInterface {
  name = 'UserPpIsNullable1718407379743';

  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(
      `ALTER TABLE \`users\` CHANGE \`profilePicture\` \`profilePicture\` varchar(255) NULL`,
    );
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(
      `ALTER TABLE \`users\` CHANGE \`profilePicture\` \`profilePicture\` varchar(255) NOT NULL`,
    );
  }
}
