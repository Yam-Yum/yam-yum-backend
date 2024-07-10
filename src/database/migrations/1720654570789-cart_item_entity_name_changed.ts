import { MigrationInterface, QueryRunner } from "typeorm";

export class CartItemEntityNameChanged1720654570789 implements MigrationInterface {
    name = 'CartItemEntityNameChanged1720654570789'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`DROP INDEX \`IDX_756f53ab9466eb52a52619ee01\` ON \`cart\``);
        await queryRunner.query(`CREATE TABLE \`cart_items\` (\`id\` varchar(36) NOT NULL, \`quantity\` int NOT NULL, \`isActive\` tinyint NOT NULL DEFAULT 1, \`createdAt\` datetime(6) NOT NULL DEFAULT CURRENT_TIMESTAMP(6), \`updatedAt\` datetime(6) NOT NULL DEFAULT CURRENT_TIMESTAMP(6) ON UPDATE CURRENT_TIMESTAMP(6), \`recipeId\` varchar(36) NULL, \`cartId\` varchar(36) NULL, PRIMARY KEY (\`id\`)) ENGINE=InnoDB`);
        await queryRunner.query(`ALTER TABLE \`cart_items\` ADD CONSTRAINT \`FK_82b9bab62f3edd5a5badcb17aa6\` FOREIGN KEY (\`recipeId\`) REFERENCES \`recipe\`(\`id\`) ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE \`cart_items\` ADD CONSTRAINT \`FK_edd714311619a5ad09525045838\` FOREIGN KEY (\`cartId\`) REFERENCES \`cart\`(\`id\`) ON DELETE NO ACTION ON UPDATE NO ACTION`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE \`cart_items\` DROP FOREIGN KEY \`FK_edd714311619a5ad09525045838\``);
        await queryRunner.query(`ALTER TABLE \`cart_items\` DROP FOREIGN KEY \`FK_82b9bab62f3edd5a5badcb17aa6\``);
        await queryRunner.query(`DROP TABLE \`cart_items\``);
        await queryRunner.query(`CREATE UNIQUE INDEX \`IDX_756f53ab9466eb52a52619ee01\` ON \`cart\` (\`userId\`)`);
    }

}
