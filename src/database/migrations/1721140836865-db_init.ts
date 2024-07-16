import { MigrationInterface, QueryRunner } from 'typeorm';

export class DbInit1721140836865 implements MigrationInterface {
  name = 'DbInit1721140836865';

  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(
      `CREATE TABLE \`users\` (\`id\` varchar(36) NOT NULL, \`firstName\` varchar(255) NOT NULL, \`lastName\` varchar(255) NOT NULL, \`username\` varchar(255) NULL, \`email\` varchar(255) NOT NULL, \`phoneNumber\` varchar(255) NOT NULL, \`password\` varchar(255) NOT NULL, \`profilePicture\` varchar(255) NULL, \`role\` enum ('admin', 'client', 'chief', 'guest') NOT NULL DEFAULT 'guest', \`gender\` enum ('male', 'female') NOT NULL DEFAULT 'male', \`dateOfBirth\` datetime NOT NULL, \`createdAt\` datetime(6) NOT NULL DEFAULT CURRENT_TIMESTAMP(6), \`updatedAt\` datetime(6) NOT NULL DEFAULT CURRENT_TIMESTAMP(6) ON UPDATE CURRENT_TIMESTAMP(6), UNIQUE INDEX \`IDX_fe0bb3f6520ee0469504521e71\` (\`username\`), UNIQUE INDEX \`IDX_97672ac88f789774dd47f7c8be\` (\`email\`), UNIQUE INDEX \`IDX_1e3d0240b49c40521aaeb95329\` (\`phoneNumber\`), PRIMARY KEY (\`id\`)) ENGINE=InnoDB`,
    );
    await queryRunner.query(
      `CREATE TABLE \`recipe\` (\`id\` varchar(36) NOT NULL, \`title\` varchar(255) NOT NULL, \`description\` text NOT NULL, \`preparationTimeInMinutes\` int NOT NULL, \`size\` enum ('Small', 'Medium', 'Large', 'ExtraLarge') NOT NULL DEFAULT 'Small', \`price\` double NOT NULL, \`status\` enum ('Draft', 'PendingApproval', 'Approved', 'Rejected', 'Inactive', 'Archived') NOT NULL DEFAULT 'Draft', \`createdAt\` datetime(6) NOT NULL DEFAULT CURRENT_TIMESTAMP(6), \`updatedAt\` datetime(6) NOT NULL DEFAULT CURRENT_TIMESTAMP(6) ON UPDATE CURRENT_TIMESTAMP(6), UNIQUE INDEX \`IDX_52f467a1124f1861bdaf15d14e\` (\`title\`), PRIMARY KEY (\`id\`)) ENGINE=InnoDB`,
    );
    await queryRunner.query(
      `CREATE TABLE \`phone_numbers\` (\`id\` varchar(36) NOT NULL, \`phoneNumber\` varchar(255) NOT NULL, \`otp\` varchar(255) NOT NULL, \`otpExpireIn\` datetime NOT NULL, \`otpConfirmed\` tinyint NOT NULL, \`verified\` tinyint NOT NULL DEFAULT 0, UNIQUE INDEX \`IDX_0c619cbcdde517187167dc2e2f\` (\`phoneNumber\`), PRIMARY KEY (\`id\`)) ENGINE=InnoDB`,
    );
    await queryRunner.query(
      `CREATE TABLE \`address\` (\`id\` varchar(36) NOT NULL, \`title\` varchar(255) NULL, \`longtude\` double NOT NULL, \`latitude\` double NOT NULL, \`country\` varchar(255) NOT NULL, \`state\` varchar(255) NOT NULL, \`city\` varchar(255) NULL, \`street\` varchar(255) NULL, \`floor\` varchar(255) NULL, \`apartmentNumber\` varchar(255) NULL, \`houseNumber\` varchar(255) NULL, \`officeNumber\` varchar(255) NULL, \`additionalDirections\` varchar(255) NULL, \`postalCode\` int NULL, \`addressType\` enum ('home', 'work', 'other') NOT NULL DEFAULT 'home', \`userId\` varchar(255) NULL, \`isActive\` tinyint NOT NULL DEFAULT 1, \`createdAt\` datetime(6) NOT NULL DEFAULT CURRENT_TIMESTAMP(6), \`updatedAt\` datetime(6) NOT NULL DEFAULT CURRENT_TIMESTAMP(6) ON UPDATE CURRENT_TIMESTAMP(6), UNIQUE INDEX \`IDX_90002c87076ad772b280ecebc4\` (\`title\`, \`userId\`), PRIMARY KEY (\`id\`)) ENGINE=InnoDB`,
    );
    await queryRunner.query(
      `CREATE TABLE \`recipe_videos\` (\`id\` varchar(36) NOT NULL, \`videoName\` varchar(255) NOT NULL, UNIQUE INDEX \`IDX_fa131c258dab652065b4e7e5be\` (\`videoName\`), PRIMARY KEY (\`id\`)) ENGINE=InnoDB`,
    );
    await queryRunner.query(
      `CREATE TABLE \`orders\` (\`id\` varchar(36) NOT NULL, \`orderNumber\` varchar(255) NOT NULL, \`fullName\` varchar(255) NOT NULL, \`phoneNumber\` varchar(255) NOT NULL, \`status\` enum ('created', 'preparing', 'shipped', 'delivered', 'pending', 'cancelled') NOT NULL DEFAULT 'created', \`itemsSubtotal\` double NOT NULL, \`shippingFee\` double NOT NULL, \`paymentMethod\` enum ('cash', 'credit') NOT NULL DEFAULT 'cash', \`createdAt\` datetime(6) NOT NULL DEFAULT CURRENT_TIMESTAMP(6), \`updatedAt\` datetime(6) NOT NULL DEFAULT CURRENT_TIMESTAMP(6) ON UPDATE CURRENT_TIMESTAMP(6), UNIQUE INDEX \`IDX_59b0c3b34ea0fa5562342f2414\` (\`orderNumber\`), PRIMARY KEY (\`id\`)) ENGINE=InnoDB`,
    );
    await queryRunner.query(
      `CREATE TABLE \`recipe_image\` (\`id\` varchar(36) NOT NULL, \`imageName\` varchar(255) NOT NULL, UNIQUE INDEX \`IDX_9c1fcc597ac2cbc5b85d40dcae\` (\`imageName\`), PRIMARY KEY (\`id\`)) ENGINE=InnoDB`,
    );
    await queryRunner.query(
      `CREATE TABLE \`refresh_tokens\` (\`id\` varchar(36) NOT NULL, \`refreshToken\` varchar(255) NOT NULL, \`expirationDate\` datetime NOT NULL, UNIQUE INDEX \`IDX_84519890ff1135ab93aba6546f\` (\`refreshToken\`), PRIMARY KEY (\`id\`)) ENGINE=InnoDB`,
    );
    await queryRunner.query(
      `CREATE TABLE \`categories\` (\`id\` varchar(36) NOT NULL, \`name\` varchar(255) NOT NULL, \`image\` varchar(255) NULL, \`isActive\` tinyint NOT NULL DEFAULT 1, \`createdAt\` datetime(6) NOT NULL DEFAULT CURRENT_TIMESTAMP(6), \`updatedAt\` datetime(6) NOT NULL DEFAULT CURRENT_TIMESTAMP(6) ON UPDATE CURRENT_TIMESTAMP(6), UNIQUE INDEX \`IDX_8b0be371d28245da6e4f4b6187\` (\`name\`), PRIMARY KEY (\`id\`)) ENGINE=InnoDB`,
    );
    await queryRunner.query(
      `CREATE TABLE \`cart_items\` (\`id\` varchar(36) NOT NULL, \`quantity\` int NOT NULL, \`isActive\` tinyint NOT NULL DEFAULT 1, \`createdAt\` datetime(6) NOT NULL DEFAULT CURRENT_TIMESTAMP(6), \`updatedAt\` datetime(6) NOT NULL DEFAULT CURRENT_TIMESTAMP(6) ON UPDATE CURRENT_TIMESTAMP(6), PRIMARY KEY (\`id\`)) ENGINE=InnoDB`,
    );
    await queryRunner.query(
      `CREATE TABLE \`cart\` (\`id\` varchar(36) NOT NULL, \`isActive\` tinyint NOT NULL DEFAULT 1, \`createdAt\` datetime(6) NOT NULL DEFAULT CURRENT_TIMESTAMP(6), \`updatedAt\` datetime(6) NOT NULL DEFAULT CURRENT_TIMESTAMP(6) ON UPDATE CURRENT_TIMESTAMP(6), PRIMARY KEY (\`id\`)) ENGINE=InnoDB`,
    );
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(`DROP TABLE \`cart\``);
    await queryRunner.query(`DROP TABLE \`cart_items\``);
    await queryRunner.query(`DROP INDEX \`IDX_8b0be371d28245da6e4f4b6187\` ON \`categories\``);
    await queryRunner.query(`DROP TABLE \`categories\``);
    await queryRunner.query(`DROP INDEX \`IDX_84519890ff1135ab93aba6546f\` ON \`refresh_tokens\``);
    await queryRunner.query(`DROP TABLE \`refresh_tokens\``);
    await queryRunner.query(`DROP INDEX \`IDX_9c1fcc597ac2cbc5b85d40dcae\` ON \`recipe_image\``);
    await queryRunner.query(`DROP TABLE \`recipe_image\``);
    await queryRunner.query(`DROP INDEX \`IDX_59b0c3b34ea0fa5562342f2414\` ON \`orders\``);
    await queryRunner.query(`DROP TABLE \`orders\``);
    await queryRunner.query(`DROP INDEX \`IDX_fa131c258dab652065b4e7e5be\` ON \`recipe_videos\``);
    await queryRunner.query(`DROP TABLE \`recipe_videos\``);
    await queryRunner.query(`DROP INDEX \`IDX_90002c87076ad772b280ecebc4\` ON \`address\``);
    await queryRunner.query(`DROP TABLE \`address\``);
    await queryRunner.query(`DROP INDEX \`IDX_0c619cbcdde517187167dc2e2f\` ON \`phone_numbers\``);
    await queryRunner.query(`DROP TABLE \`phone_numbers\``);
    await queryRunner.query(`DROP INDEX \`IDX_52f467a1124f1861bdaf15d14e\` ON \`recipe\``);
    await queryRunner.query(`DROP TABLE \`recipe\``);
    await queryRunner.query(`DROP INDEX \`IDX_1e3d0240b49c40521aaeb95329\` ON \`users\``);
    await queryRunner.query(`DROP INDEX \`IDX_97672ac88f789774dd47f7c8be\` ON \`users\``);
    await queryRunner.query(`DROP INDEX \`IDX_fe0bb3f6520ee0469504521e71\` ON \`users\``);
    await queryRunner.query(`DROP TABLE \`users\``);
  }
}
