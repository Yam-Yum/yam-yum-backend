import { MigrationInterface, QueryRunner } from 'typeorm';

export class DbInit1719954558400 implements MigrationInterface {
  name = 'DbInit1719954558400';

  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(
      `CREATE TABLE \`phone_numbers\` (\`id\` varchar(36) NOT NULL, \`phoneNumber\` varchar(255) NOT NULL, \`otp\` varchar(255) NOT NULL, \`otpExpireIn\` datetime NOT NULL, \`otpConfirmed\` tinyint NOT NULL, \`verified\` tinyint NOT NULL DEFAULT 0, \`userId\` varchar(36) NULL, UNIQUE INDEX \`IDX_0c619cbcdde517187167dc2e2f\` (\`phoneNumber\`), UNIQUE INDEX \`REL_61f0aacd415edcd3268eab0a4b\` (\`userId\`), PRIMARY KEY (\`id\`)) ENGINE=InnoDB`,
    );
    await queryRunner.query(
      `CREATE TABLE \`address\` (\`id\` varchar(36) NOT NULL, \`title\` varchar(255) NULL, \`longtude\` double NOT NULL, \`latitude\` double NOT NULL, \`country\` varchar(255) NOT NULL, \`state\` varchar(255) NOT NULL, \`city\` varchar(255) NULL, \`street\` varchar(255) NOT NULL, \`floor\` varchar(255) NULL, \`apartmentNumber\` varchar(255) NULL, \`houseNumber\` varchar(255) NULL, \`officeNumber\` varchar(255) NULL, \`additionalDirections\` varchar(255) NULL, \`postalCode\` int NULL, \`addressType\` enum ('home', 'work', 'other') NOT NULL DEFAULT 'home', \`userId\` varchar(255) NULL, \`isActive\` tinyint NOT NULL DEFAULT 1, \`createdAt\` datetime(6) NOT NULL DEFAULT CURRENT_TIMESTAMP(6), \`updatedAt\` datetime(6) NOT NULL DEFAULT CURRENT_TIMESTAMP(6) ON UPDATE CURRENT_TIMESTAMP(6), UNIQUE INDEX \`IDX_90002c87076ad772b280ecebc4\` (\`title\`, \`userId\`), PRIMARY KEY (\`id\`)) ENGINE=InnoDB`,
    );
    await queryRunner.query(
      `CREATE TABLE \`users\` (\`id\` varchar(36) NOT NULL, \`firstName\` varchar(255) NOT NULL, \`lastName\` varchar(255) NOT NULL, \`username\` varchar(255) NOT NULL, \`email\` varchar(255) NOT NULL, \`phoneNumber\` varchar(255) NOT NULL, \`password\` varchar(255) NOT NULL, \`profilePicture\` varchar(255) NULL, \`role\` enum ('admin', 'client', 'chief', 'guest') NOT NULL DEFAULT 'guest', \`gender\` enum ('male', 'female') NOT NULL DEFAULT 'male', \`dateOfBirth\` datetime NOT NULL, \`createdAt\` datetime(6) NOT NULL DEFAULT CURRENT_TIMESTAMP(6), \`updatedAt\` datetime(6) NOT NULL DEFAULT CURRENT_TIMESTAMP(6) ON UPDATE CURRENT_TIMESTAMP(6), UNIQUE INDEX \`IDX_fe0bb3f6520ee0469504521e71\` (\`username\`), UNIQUE INDEX \`IDX_97672ac88f789774dd47f7c8be\` (\`email\`), UNIQUE INDEX \`IDX_1e3d0240b49c40521aaeb95329\` (\`phoneNumber\`), PRIMARY KEY (\`id\`)) ENGINE=InnoDB`,
    );
    await queryRunner.query(
      `CREATE TABLE \`refresh_tokens\` (\`id\` varchar(36) NOT NULL, \`refreshToken\` varchar(255) NOT NULL, \`expirationDate\` datetime NOT NULL, \`userId\` varchar(36) NULL, UNIQUE INDEX \`IDX_84519890ff1135ab93aba6546f\` (\`refreshToken\`), UNIQUE INDEX \`REL_610102b60fea1455310ccd299d\` (\`userId\`), PRIMARY KEY (\`id\`)) ENGINE=InnoDB`,
    );
    await queryRunner.query(
      `CREATE TABLE \`categories\` (\`id\` varchar(36) NOT NULL, \`name\` varchar(255) NOT NULL, \`image\` varchar(255) NULL, \`isActive\` tinyint NOT NULL DEFAULT 1, \`createdAt\` datetime(6) NOT NULL DEFAULT CURRENT_TIMESTAMP(6), \`updatedAt\` datetime(6) NOT NULL DEFAULT CURRENT_TIMESTAMP(6) ON UPDATE CURRENT_TIMESTAMP(6), UNIQUE INDEX \`IDX_8b0be371d28245da6e4f4b6187\` (\`name\`), PRIMARY KEY (\`id\`)) ENGINE=InnoDB`,
    );
    await queryRunner.query(
      `ALTER TABLE \`phone_numbers\` ADD CONSTRAINT \`FK_61f0aacd415edcd3268eab0a4b4\` FOREIGN KEY (\`userId\`) REFERENCES \`users\`(\`id\`) ON DELETE CASCADE ON UPDATE NO ACTION`,
    );
    await queryRunner.query(
      `ALTER TABLE \`address\` ADD CONSTRAINT \`FK_d25f1ea79e282cc8a42bd616aa3\` FOREIGN KEY (\`userId\`) REFERENCES \`users\`(\`id\`) ON DELETE NO ACTION ON UPDATE NO ACTION`,
    );
    await queryRunner.query(
      `ALTER TABLE \`refresh_tokens\` ADD CONSTRAINT \`FK_610102b60fea1455310ccd299de\` FOREIGN KEY (\`userId\`) REFERENCES \`users\`(\`id\`) ON DELETE CASCADE ON UPDATE NO ACTION`,
    );
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(
      `ALTER TABLE \`refresh_tokens\` DROP FOREIGN KEY \`FK_610102b60fea1455310ccd299de\``,
    );
    await queryRunner.query(
      `ALTER TABLE \`address\` DROP FOREIGN KEY \`FK_d25f1ea79e282cc8a42bd616aa3\``,
    );
    await queryRunner.query(
      `ALTER TABLE \`phone_numbers\` DROP FOREIGN KEY \`FK_61f0aacd415edcd3268eab0a4b4\``,
    );
    await queryRunner.query(`DROP INDEX \`IDX_8b0be371d28245da6e4f4b6187\` ON \`categories\``);
    await queryRunner.query(`DROP TABLE \`categories\``);
    await queryRunner.query(`DROP INDEX \`REL_610102b60fea1455310ccd299d\` ON \`refresh_tokens\``);
    await queryRunner.query(`DROP INDEX \`IDX_84519890ff1135ab93aba6546f\` ON \`refresh_tokens\``);
    await queryRunner.query(`DROP TABLE \`refresh_tokens\``);
    await queryRunner.query(`DROP INDEX \`IDX_1e3d0240b49c40521aaeb95329\` ON \`users\``);
    await queryRunner.query(`DROP INDEX \`IDX_97672ac88f789774dd47f7c8be\` ON \`users\``);
    await queryRunner.query(`DROP INDEX \`IDX_fe0bb3f6520ee0469504521e71\` ON \`users\``);
    await queryRunner.query(`DROP TABLE \`users\``);
    await queryRunner.query(`DROP INDEX \`IDX_90002c87076ad772b280ecebc4\` ON \`address\``);
    await queryRunner.query(`DROP TABLE \`address\``);
    await queryRunner.query(`DROP INDEX \`REL_61f0aacd415edcd3268eab0a4b\` ON \`phone_numbers\``);
    await queryRunner.query(`DROP INDEX \`IDX_0c619cbcdde517187167dc2e2f\` ON \`phone_numbers\``);
    await queryRunner.query(`DROP TABLE \`phone_numbers\``);
  }
}
