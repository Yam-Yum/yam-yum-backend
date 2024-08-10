import { MigrationInterface, QueryRunner } from "typeorm";

export class FixOrderRecipeRelation1723315831367 implements MigrationInterface {
    name = 'FixOrderRecipeRelation1723315831367'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE \`orders_recipes\` DROP FOREIGN KEY \`FK_0907fd348de3bbb1ea14d6f24de\``);
        await queryRunner.query(`ALTER TABLE \`orders_recipes\` DROP FOREIGN KEY \`FK_c3c3466baac50ff9a0354dcb0ed\``);
        await queryRunner.query(`DROP INDEX \`IDX_0907fd348de3bbb1ea14d6f24d\` ON \`orders_recipes\``);
        await queryRunner.query(`ALTER TABLE \`orders_recipes\` CHANGE \`ordersId\` \`orderId\` varchar(36) NOT NULL`);
        await queryRunner.query(`CREATE INDEX \`IDX_accca88f66efb5861b45450adb\` ON \`orders_recipes\` (\`orderId\`)`);
        await queryRunner.query(`ALTER TABLE \`orders_recipes\` ADD CONSTRAINT \`FK_c3c3466baac50ff9a0354dcb0ed\` FOREIGN KEY (\`recipeId\`) REFERENCES \`orders\`(\`id\`) ON DELETE CASCADE ON UPDATE CASCADE`);
        await queryRunner.query(`ALTER TABLE \`orders_recipes\` ADD CONSTRAINT \`FK_accca88f66efb5861b45450adbc\` FOREIGN KEY (\`orderId\`) REFERENCES \`recipe\`(\`id\`) ON DELETE NO ACTION ON UPDATE NO ACTION`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE \`orders_recipes\` DROP FOREIGN KEY \`FK_accca88f66efb5861b45450adbc\``);
        await queryRunner.query(`ALTER TABLE \`orders_recipes\` DROP FOREIGN KEY \`FK_c3c3466baac50ff9a0354dcb0ed\``);
        await queryRunner.query(`DROP INDEX \`IDX_accca88f66efb5861b45450adb\` ON \`orders_recipes\``);
        await queryRunner.query(`ALTER TABLE \`orders_recipes\` CHANGE \`orderId\` \`ordersId\` varchar(36) NOT NULL`);
        await queryRunner.query(`CREATE INDEX \`IDX_0907fd348de3bbb1ea14d6f24d\` ON \`orders_recipes\` (\`ordersId\`)`);
        await queryRunner.query(`ALTER TABLE \`orders_recipes\` ADD CONSTRAINT \`FK_c3c3466baac50ff9a0354dcb0ed\` FOREIGN KEY (\`recipeId\`) REFERENCES \`recipe\`(\`id\`) ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE \`orders_recipes\` ADD CONSTRAINT \`FK_0907fd348de3bbb1ea14d6f24de\` FOREIGN KEY (\`ordersId\`) REFERENCES \`orders\`(\`id\`) ON DELETE CASCADE ON UPDATE CASCADE`);
    }

}
