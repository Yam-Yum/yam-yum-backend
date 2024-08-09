import { MigrationInterface, QueryRunner } from "typeorm";

export class Init1723232067952 implements MigrationInterface {
    name = 'Init1723232067952'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`CREATE TABLE \`phone_numbers\` (\`id\` varchar(36) NOT NULL, \`phoneNumber\` varchar(255) NOT NULL, \`otp\` varchar(255) NOT NULL, \`otpExpireIn\` datetime NOT NULL, \`otpConfirmed\` tinyint NOT NULL, \`verified\` tinyint NOT NULL DEFAULT 0, \`userId\` varchar(36) NULL, UNIQUE INDEX \`IDX_0c619cbcdde517187167dc2e2f\` (\`phoneNumber\`), UNIQUE INDEX \`REL_61f0aacd415edcd3268eab0a4b\` (\`userId\`), PRIMARY KEY (\`id\`)) ENGINE=InnoDB`);
        await queryRunner.query(`CREATE TABLE \`refresh_tokens\` (\`id\` varchar(36) NOT NULL, \`refreshToken\` varchar(255) NOT NULL, \`expirationDate\` datetime NOT NULL, \`userId\` varchar(36) NULL, UNIQUE INDEX \`IDX_84519890ff1135ab93aba6546f\` (\`refreshToken\`), UNIQUE INDEX \`REL_610102b60fea1455310ccd299d\` (\`userId\`), PRIMARY KEY (\`id\`)) ENGINE=InnoDB`);
        await queryRunner.query(`CREATE TABLE \`categories\` (\`id\` varchar(36) NOT NULL, \`name\` varchar(255) NOT NULL, \`imageName\` varchar(255) NULL, \`deletedAt\` datetime(6) NULL, \`createdAt\` datetime(6) NOT NULL DEFAULT CURRENT_TIMESTAMP(6), \`updatedAt\` datetime(6) NOT NULL DEFAULT CURRENT_TIMESTAMP(6) ON UPDATE CURRENT_TIMESTAMP(6), UNIQUE INDEX \`IDX_8b0be371d28245da6e4f4b6187\` (\`name\`), PRIMARY KEY (\`id\`)) ENGINE=InnoDB`);
        await queryRunner.query(`CREATE TABLE \`recipe_image\` (\`id\` varchar(36) NOT NULL, \`imageName\` varchar(255) NOT NULL, \`recipeId\` varchar(36) NULL, PRIMARY KEY (\`id\`)) ENGINE=InnoDB`);
        await queryRunner.query(`CREATE TABLE \`likes\` (\`id\` varchar(36) NOT NULL, \`createdAt\` datetime(6) NOT NULL DEFAULT CURRENT_TIMESTAMP(6), \`updatedAt\` datetime(6) NOT NULL DEFAULT CURRENT_TIMESTAMP(6) ON UPDATE CURRENT_TIMESTAMP(6), \`videoId\` varchar(36) NULL, \`userId\` varchar(36) NULL, UNIQUE INDEX \`IDX_33565ef5d74ca26a9120aa44a6\` (\`videoId\`, \`userId\`), PRIMARY KEY (\`id\`)) ENGINE=InnoDB`);
        await queryRunner.query(`CREATE TABLE \`comments\` (\`id\` varchar(36) NOT NULL, \`content\` varchar(255) NOT NULL, \`createdAt\` datetime(6) NOT NULL DEFAULT CURRENT_TIMESTAMP(6), \`updatedAt\` datetime(6) NOT NULL DEFAULT CURRENT_TIMESTAMP(6) ON UPDATE CURRENT_TIMESTAMP(6), \`videoId\` varchar(36) NULL, \`userId\` varchar(36) NULL, PRIMARY KEY (\`id\`)) ENGINE=InnoDB`);
        await queryRunner.query(`CREATE TABLE \`recipe_videos\` (\`id\` varchar(36) NOT NULL, \`videoName\` varchar(255) NOT NULL, \`likesCount\` int NOT NULL DEFAULT '0', \`recipeId\` varchar(36) NULL, UNIQUE INDEX \`REL_a322c5517e09c5c149c39c82d1\` (\`recipeId\`), PRIMARY KEY (\`id\`)) ENGINE=InnoDB`);
        await queryRunner.query(`CREATE TABLE \`cart\` (\`id\` varchar(36) NOT NULL, \`isActive\` tinyint NOT NULL DEFAULT 1, \`createdAt\` datetime(6) NOT NULL DEFAULT CURRENT_TIMESTAMP(6), \`updatedAt\` datetime(6) NOT NULL DEFAULT CURRENT_TIMESTAMP(6) ON UPDATE CURRENT_TIMESTAMP(6), \`userId\` varchar(36) NULL, UNIQUE INDEX \`REL_756f53ab9466eb52a52619ee01\` (\`userId\`), PRIMARY KEY (\`id\`)) ENGINE=InnoDB`);
        await queryRunner.query(`CREATE TABLE \`cart_items\` (\`id\` varchar(36) NOT NULL, \`quantity\` int NOT NULL, \`isActive\` tinyint NOT NULL DEFAULT 1, \`createdAt\` datetime(6) NOT NULL DEFAULT CURRENT_TIMESTAMP(6), \`updatedAt\` datetime(6) NOT NULL DEFAULT CURRENT_TIMESTAMP(6) ON UPDATE CURRENT_TIMESTAMP(6), \`recipeId\` varchar(36) NULL, \`cartId\` varchar(36) NULL, PRIMARY KEY (\`id\`)) ENGINE=InnoDB`);
        await queryRunner.query(`CREATE TABLE \`address\` (\`id\` varchar(36) NOT NULL, \`title\` varchar(255) NULL, \`longitude\` double NOT NULL, \`latitude\` double NOT NULL, \`country\` varchar(255) NOT NULL, \`state\` varchar(255) NOT NULL, \`city\` varchar(255) NULL, \`street\` varchar(255) NULL, \`floor\` varchar(255) NULL, \`apartmentNumber\` varchar(255) NULL, \`houseNumber\` varchar(255) NULL, \`officeNumber\` varchar(255) NULL, \`additionalDirections\` varchar(255) NULL, \`postalCode\` int NULL, \`addressType\` enum ('home', 'work', 'other') NOT NULL DEFAULT 'home', \`userId\` varchar(255) NULL, \`isActive\` tinyint NOT NULL DEFAULT 1, \`createdAt\` datetime(6) NOT NULL DEFAULT CURRENT_TIMESTAMP(6), \`updatedAt\` datetime(6) NOT NULL DEFAULT CURRENT_TIMESTAMP(6) ON UPDATE CURRENT_TIMESTAMP(6), UNIQUE INDEX \`IDX_90002c87076ad772b280ecebc4\` (\`title\`, \`userId\`), PRIMARY KEY (\`id\`)) ENGINE=InnoDB`);
        await queryRunner.query(`CREATE TABLE \`orders\` (\`id\` varchar(36) NOT NULL, \`orderNumber\` varchar(255) NOT NULL, \`fullName\` varchar(255) NOT NULL, \`phoneNumber\` varchar(255) NOT NULL, \`status\` enum ('created', 'preparing', 'shipped', 'delivered', 'pending', 'cancelled') NOT NULL DEFAULT 'created', \`itemsSubtotal\` float NOT NULL, \`shippingFee\` float NOT NULL, \`discount\` int NOT NULL, \`orderTotal\` float NOT NULL, \`paymentMethod\` enum ('cash', 'credit') NOT NULL DEFAULT 'cash', \`createdAt\` datetime(6) NOT NULL DEFAULT CURRENT_TIMESTAMP(6), \`updatedAt\` datetime(6) NOT NULL DEFAULT CURRENT_TIMESTAMP(6) ON UPDATE CURRENT_TIMESTAMP(6), \`addressId\` varchar(36) NULL, \`userId\` varchar(36) NULL, UNIQUE INDEX \`IDX_59b0c3b34ea0fa5562342f2414\` (\`orderNumber\`), PRIMARY KEY (\`id\`)) ENGINE=InnoDB`);
        await queryRunner.query(`CREATE TABLE \`reviews\` (\`id\` varchar(36) NOT NULL, \`rating\` enum ('1', '2', '3', '4', '5') NOT NULL DEFAULT '5', \`comment\` text NOT NULL, \`createdAt\` datetime(6) NOT NULL DEFAULT CURRENT_TIMESTAMP(6), \`updatedAt\` datetime(6) NOT NULL DEFAULT CURRENT_TIMESTAMP(6) ON UPDATE CURRENT_TIMESTAMP(6), \`recipeId\` varchar(36) NULL, \`userId\` varchar(36) NULL, PRIMARY KEY (\`id\`)) ENGINE=InnoDB`);
        await queryRunner.query(`CREATE TABLE \`recipe\` (\`id\` varchar(36) NOT NULL, \`title\` varchar(255) NOT NULL, \`description\` text NOT NULL, \`preparationTimeInMinutes\` int NOT NULL, \`size\` enum ('Small', 'Medium', 'Large', 'ExtraLarge') NOT NULL DEFAULT 'Small', \`price\` double NOT NULL, \`status\` enum ('Draft', 'PendingApproval', 'Approved', 'Rejected', 'Inactive', 'Archived') NOT NULL DEFAULT 'Draft', \`rate\` float NULL, \`orderCount\` int NULL, \`createdAt\` datetime(6) NOT NULL DEFAULT CURRENT_TIMESTAMP(6), \`updatedAt\` datetime(6) NOT NULL DEFAULT CURRENT_TIMESTAMP(6) ON UPDATE CURRENT_TIMESTAMP(6), \`categoryId\` varchar(36) NULL, \`authorId\` varchar(36) NULL, UNIQUE INDEX \`IDX_52f467a1124f1861bdaf15d14e\` (\`title\`), PRIMARY KEY (\`id\`)) ENGINE=InnoDB`);
        await queryRunner.query(`CREATE TABLE \`favorite_items\` (\`id\` varchar(36) NOT NULL, \`favoriteId\` varchar(36) NULL, \`recipeId\` varchar(36) NULL, UNIQUE INDEX \`IDX_c93f5cf158f8176ece6e7d1a37\` (\`favoriteId\`, \`recipeId\`), PRIMARY KEY (\`id\`)) ENGINE=InnoDB`);
        await queryRunner.query(`CREATE TABLE \`favorite\` (\`id\` varchar(36) NOT NULL, \`userId\` varchar(36) NULL, UNIQUE INDEX \`REL_83b775fdebbe24c29b2b5831f2\` (\`userId\`), PRIMARY KEY (\`id\`)) ENGINE=InnoDB`);
        await queryRunner.query(`CREATE TABLE \`users\` (\`id\` varchar(36) NOT NULL, \`firstName\` varchar(255) NOT NULL, \`lastName\` varchar(255) NOT NULL, \`username\` varchar(255) NULL, \`email\` varchar(255) NOT NULL, \`phoneNumber\` varchar(255) NOT NULL, \`password\` varchar(255) NOT NULL, \`profilePicture\` varchar(255) NULL, \`role\` enum ('admin', 'client', 'chief', 'guest') NOT NULL DEFAULT 'guest', \`gender\` enum ('male', 'female') NOT NULL DEFAULT 'male', \`dateOfBirth\` datetime NOT NULL, \`createdAt\` datetime(6) NOT NULL DEFAULT CURRENT_TIMESTAMP(6), \`updatedAt\` datetime(6) NOT NULL DEFAULT CURRENT_TIMESTAMP(6) ON UPDATE CURRENT_TIMESTAMP(6), UNIQUE INDEX \`IDX_fe0bb3f6520ee0469504521e71\` (\`username\`), UNIQUE INDEX \`IDX_97672ac88f789774dd47f7c8be\` (\`email\`), UNIQUE INDEX \`IDX_1e3d0240b49c40521aaeb95329\` (\`phoneNumber\`), PRIMARY KEY (\`id\`)) ENGINE=InnoDB`);
        await queryRunner.query(`CREATE TABLE \`orders_recipes\` (\`ordersId\` varchar(36) NOT NULL, \`recipeId\` varchar(36) NOT NULL, INDEX \`IDX_0907fd348de3bbb1ea14d6f24d\` (\`ordersId\`), INDEX \`IDX_c3c3466baac50ff9a0354dcb0e\` (\`recipeId\`), PRIMARY KEY (\`ordersId\`, \`recipeId\`)) ENGINE=InnoDB`);
        await queryRunner.query(`CREATE TABLE \`recipe_orders_orders\` (\`recipeId\` varchar(36) NOT NULL, \`ordersId\` varchar(36) NOT NULL, INDEX \`IDX_70b819af68b902833d3bf01f9a\` (\`recipeId\`), INDEX \`IDX_78c7ba62061b0994c92979a438\` (\`ordersId\`), PRIMARY KEY (\`recipeId\`, \`ordersId\`)) ENGINE=InnoDB`);
        await queryRunner.query(`ALTER TABLE \`phone_numbers\` ADD CONSTRAINT \`FK_61f0aacd415edcd3268eab0a4b4\` FOREIGN KEY (\`userId\`) REFERENCES \`users\`(\`id\`) ON DELETE CASCADE ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE \`refresh_tokens\` ADD CONSTRAINT \`FK_610102b60fea1455310ccd299de\` FOREIGN KEY (\`userId\`) REFERENCES \`users\`(\`id\`) ON DELETE CASCADE ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE \`recipe_image\` ADD CONSTRAINT \`FK_d1130c698254134c0cd22507b97\` FOREIGN KEY (\`recipeId\`) REFERENCES \`recipe\`(\`id\`) ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE \`likes\` ADD CONSTRAINT \`FK_5048b180fe14b1e90b4baae2762\` FOREIGN KEY (\`videoId\`) REFERENCES \`recipe_videos\`(\`id\`) ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE \`likes\` ADD CONSTRAINT \`FK_cfd8e81fac09d7339a32e57d904\` FOREIGN KEY (\`userId\`) REFERENCES \`users\`(\`id\`) ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE \`comments\` ADD CONSTRAINT \`FK_fd913da8a700d37ba1a456021c1\` FOREIGN KEY (\`videoId\`) REFERENCES \`recipe_videos\`(\`id\`) ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE \`comments\` ADD CONSTRAINT \`FK_7e8d7c49f218ebb14314fdb3749\` FOREIGN KEY (\`userId\`) REFERENCES \`users\`(\`id\`) ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE \`recipe_videos\` ADD CONSTRAINT \`FK_a322c5517e09c5c149c39c82d1c\` FOREIGN KEY (\`recipeId\`) REFERENCES \`recipe\`(\`id\`) ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE \`cart\` ADD CONSTRAINT \`FK_756f53ab9466eb52a52619ee019\` FOREIGN KEY (\`userId\`) REFERENCES \`users\`(\`id\`) ON DELETE CASCADE ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE \`cart_items\` ADD CONSTRAINT \`FK_82b9bab62f3edd5a5badcb17aa6\` FOREIGN KEY (\`recipeId\`) REFERENCES \`recipe\`(\`id\`) ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE \`cart_items\` ADD CONSTRAINT \`FK_edd714311619a5ad09525045838\` FOREIGN KEY (\`cartId\`) REFERENCES \`cart\`(\`id\`) ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE \`address\` ADD CONSTRAINT \`FK_d25f1ea79e282cc8a42bd616aa3\` FOREIGN KEY (\`userId\`) REFERENCES \`users\`(\`id\`) ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE \`orders\` ADD CONSTRAINT \`FK_37636d260931dcf46d11892f614\` FOREIGN KEY (\`addressId\`) REFERENCES \`address\`(\`id\`) ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE \`orders\` ADD CONSTRAINT \`FK_151b79a83ba240b0cb31b2302d1\` FOREIGN KEY (\`userId\`) REFERENCES \`users\`(\`id\`) ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE \`reviews\` ADD CONSTRAINT \`FK_7e3b53f4f1dc9c097ca33072bde\` FOREIGN KEY (\`recipeId\`) REFERENCES \`recipe\`(\`id\`) ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE \`reviews\` ADD CONSTRAINT \`FK_7ed5659e7139fc8bc039198cc1f\` FOREIGN KEY (\`userId\`) REFERENCES \`users\`(\`id\`) ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE \`recipe\` ADD CONSTRAINT \`FK_991484dd8189182dafe91e44413\` FOREIGN KEY (\`categoryId\`) REFERENCES \`categories\`(\`id\`) ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE \`recipe\` ADD CONSTRAINT \`FK_1370c876f9d4a525a45a9b50d81\` FOREIGN KEY (\`authorId\`) REFERENCES \`users\`(\`id\`) ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE \`favorite_items\` ADD CONSTRAINT \`FK_ac209e8dee48449b3495ed23b44\` FOREIGN KEY (\`favoriteId\`) REFERENCES \`favorite\`(\`id\`) ON DELETE CASCADE ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE \`favorite_items\` ADD CONSTRAINT \`FK_d2db0b342dde9228158028ad0d4\` FOREIGN KEY (\`recipeId\`) REFERENCES \`recipe\`(\`id\`) ON DELETE CASCADE ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE \`favorite\` ADD CONSTRAINT \`FK_83b775fdebbe24c29b2b5831f2d\` FOREIGN KEY (\`userId\`) REFERENCES \`users\`(\`id\`) ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE \`orders_recipes\` ADD CONSTRAINT \`FK_0907fd348de3bbb1ea14d6f24de\` FOREIGN KEY (\`ordersId\`) REFERENCES \`orders\`(\`id\`) ON DELETE CASCADE ON UPDATE CASCADE`);
        await queryRunner.query(`ALTER TABLE \`orders_recipes\` ADD CONSTRAINT \`FK_c3c3466baac50ff9a0354dcb0ed\` FOREIGN KEY (\`recipeId\`) REFERENCES \`recipe\`(\`id\`) ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE \`recipe_orders_orders\` ADD CONSTRAINT \`FK_70b819af68b902833d3bf01f9a0\` FOREIGN KEY (\`recipeId\`) REFERENCES \`recipe\`(\`id\`) ON DELETE CASCADE ON UPDATE CASCADE`);
        await queryRunner.query(`ALTER TABLE \`recipe_orders_orders\` ADD CONSTRAINT \`FK_78c7ba62061b0994c92979a4388\` FOREIGN KEY (\`ordersId\`) REFERENCES \`orders\`(\`id\`) ON DELETE NO ACTION ON UPDATE NO ACTION`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE \`recipe_orders_orders\` DROP FOREIGN KEY \`FK_78c7ba62061b0994c92979a4388\``);
        await queryRunner.query(`ALTER TABLE \`recipe_orders_orders\` DROP FOREIGN KEY \`FK_70b819af68b902833d3bf01f9a0\``);
        await queryRunner.query(`ALTER TABLE \`orders_recipes\` DROP FOREIGN KEY \`FK_c3c3466baac50ff9a0354dcb0ed\``);
        await queryRunner.query(`ALTER TABLE \`orders_recipes\` DROP FOREIGN KEY \`FK_0907fd348de3bbb1ea14d6f24de\``);
        await queryRunner.query(`ALTER TABLE \`favorite\` DROP FOREIGN KEY \`FK_83b775fdebbe24c29b2b5831f2d\``);
        await queryRunner.query(`ALTER TABLE \`favorite_items\` DROP FOREIGN KEY \`FK_d2db0b342dde9228158028ad0d4\``);
        await queryRunner.query(`ALTER TABLE \`favorite_items\` DROP FOREIGN KEY \`FK_ac209e8dee48449b3495ed23b44\``);
        await queryRunner.query(`ALTER TABLE \`recipe\` DROP FOREIGN KEY \`FK_1370c876f9d4a525a45a9b50d81\``);
        await queryRunner.query(`ALTER TABLE \`recipe\` DROP FOREIGN KEY \`FK_991484dd8189182dafe91e44413\``);
        await queryRunner.query(`ALTER TABLE \`reviews\` DROP FOREIGN KEY \`FK_7ed5659e7139fc8bc039198cc1f\``);
        await queryRunner.query(`ALTER TABLE \`reviews\` DROP FOREIGN KEY \`FK_7e3b53f4f1dc9c097ca33072bde\``);
        await queryRunner.query(`ALTER TABLE \`orders\` DROP FOREIGN KEY \`FK_151b79a83ba240b0cb31b2302d1\``);
        await queryRunner.query(`ALTER TABLE \`orders\` DROP FOREIGN KEY \`FK_37636d260931dcf46d11892f614\``);
        await queryRunner.query(`ALTER TABLE \`address\` DROP FOREIGN KEY \`FK_d25f1ea79e282cc8a42bd616aa3\``);
        await queryRunner.query(`ALTER TABLE \`cart_items\` DROP FOREIGN KEY \`FK_edd714311619a5ad09525045838\``);
        await queryRunner.query(`ALTER TABLE \`cart_items\` DROP FOREIGN KEY \`FK_82b9bab62f3edd5a5badcb17aa6\``);
        await queryRunner.query(`ALTER TABLE \`cart\` DROP FOREIGN KEY \`FK_756f53ab9466eb52a52619ee019\``);
        await queryRunner.query(`ALTER TABLE \`recipe_videos\` DROP FOREIGN KEY \`FK_a322c5517e09c5c149c39c82d1c\``);
        await queryRunner.query(`ALTER TABLE \`comments\` DROP FOREIGN KEY \`FK_7e8d7c49f218ebb14314fdb3749\``);
        await queryRunner.query(`ALTER TABLE \`comments\` DROP FOREIGN KEY \`FK_fd913da8a700d37ba1a456021c1\``);
        await queryRunner.query(`ALTER TABLE \`likes\` DROP FOREIGN KEY \`FK_cfd8e81fac09d7339a32e57d904\``);
        await queryRunner.query(`ALTER TABLE \`likes\` DROP FOREIGN KEY \`FK_5048b180fe14b1e90b4baae2762\``);
        await queryRunner.query(`ALTER TABLE \`recipe_image\` DROP FOREIGN KEY \`FK_d1130c698254134c0cd22507b97\``);
        await queryRunner.query(`ALTER TABLE \`refresh_tokens\` DROP FOREIGN KEY \`FK_610102b60fea1455310ccd299de\``);
        await queryRunner.query(`ALTER TABLE \`phone_numbers\` DROP FOREIGN KEY \`FK_61f0aacd415edcd3268eab0a4b4\``);
        await queryRunner.query(`DROP INDEX \`IDX_78c7ba62061b0994c92979a438\` ON \`recipe_orders_orders\``);
        await queryRunner.query(`DROP INDEX \`IDX_70b819af68b902833d3bf01f9a\` ON \`recipe_orders_orders\``);
        await queryRunner.query(`DROP TABLE \`recipe_orders_orders\``);
        await queryRunner.query(`DROP INDEX \`IDX_c3c3466baac50ff9a0354dcb0e\` ON \`orders_recipes\``);
        await queryRunner.query(`DROP INDEX \`IDX_0907fd348de3bbb1ea14d6f24d\` ON \`orders_recipes\``);
        await queryRunner.query(`DROP TABLE \`orders_recipes\``);
        await queryRunner.query(`DROP INDEX \`IDX_1e3d0240b49c40521aaeb95329\` ON \`users\``);
        await queryRunner.query(`DROP INDEX \`IDX_97672ac88f789774dd47f7c8be\` ON \`users\``);
        await queryRunner.query(`DROP INDEX \`IDX_fe0bb3f6520ee0469504521e71\` ON \`users\``);
        await queryRunner.query(`DROP TABLE \`users\``);
        await queryRunner.query(`DROP INDEX \`REL_83b775fdebbe24c29b2b5831f2\` ON \`favorite\``);
        await queryRunner.query(`DROP TABLE \`favorite\``);
        await queryRunner.query(`DROP INDEX \`IDX_c93f5cf158f8176ece6e7d1a37\` ON \`favorite_items\``);
        await queryRunner.query(`DROP TABLE \`favorite_items\``);
        await queryRunner.query(`DROP INDEX \`IDX_52f467a1124f1861bdaf15d14e\` ON \`recipe\``);
        await queryRunner.query(`DROP TABLE \`recipe\``);
        await queryRunner.query(`DROP TABLE \`reviews\``);
        await queryRunner.query(`DROP INDEX \`IDX_59b0c3b34ea0fa5562342f2414\` ON \`orders\``);
        await queryRunner.query(`DROP TABLE \`orders\``);
        await queryRunner.query(`DROP INDEX \`IDX_90002c87076ad772b280ecebc4\` ON \`address\``);
        await queryRunner.query(`DROP TABLE \`address\``);
        await queryRunner.query(`DROP TABLE \`cart_items\``);
        await queryRunner.query(`DROP INDEX \`REL_756f53ab9466eb52a52619ee01\` ON \`cart\``);
        await queryRunner.query(`DROP TABLE \`cart\``);
        await queryRunner.query(`DROP INDEX \`REL_a322c5517e09c5c149c39c82d1\` ON \`recipe_videos\``);
        await queryRunner.query(`DROP TABLE \`recipe_videos\``);
        await queryRunner.query(`DROP TABLE \`comments\``);
        await queryRunner.query(`DROP INDEX \`IDX_33565ef5d74ca26a9120aa44a6\` ON \`likes\``);
        await queryRunner.query(`DROP TABLE \`likes\``);
        await queryRunner.query(`DROP TABLE \`recipe_image\``);
        await queryRunner.query(`DROP INDEX \`IDX_8b0be371d28245da6e4f4b6187\` ON \`categories\``);
        await queryRunner.query(`DROP TABLE \`categories\``);
        await queryRunner.query(`DROP INDEX \`REL_610102b60fea1455310ccd299d\` ON \`refresh_tokens\``);
        await queryRunner.query(`DROP INDEX \`IDX_84519890ff1135ab93aba6546f\` ON \`refresh_tokens\``);
        await queryRunner.query(`DROP TABLE \`refresh_tokens\``);
        await queryRunner.query(`DROP INDEX \`REL_61f0aacd415edcd3268eab0a4b\` ON \`phone_numbers\``);
        await queryRunner.query(`DROP INDEX \`IDX_0c619cbcdde517187167dc2e2f\` ON \`phone_numbers\``);
        await queryRunner.query(`DROP TABLE \`phone_numbers\``);
    }

}
