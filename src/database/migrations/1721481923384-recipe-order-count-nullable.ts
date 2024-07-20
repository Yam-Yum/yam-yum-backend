import { MigrationInterface, QueryRunner } from "typeorm";

export class RecipeOrderCountNullable1721481923384 implements MigrationInterface {
    name = 'RecipeOrderCountNullable1721481923384'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE \`orders\` DROP COLUMN \`itemsSubtotal\``);
        await queryRunner.query(`ALTER TABLE \`orders\` ADD \`itemsSubtotal\` float NOT NULL`);
        await queryRunner.query(`ALTER TABLE \`orders\` DROP COLUMN \`shippingFee\``);
        await queryRunner.query(`ALTER TABLE \`orders\` ADD \`shippingFee\` float NOT NULL`);
        await queryRunner.query(`ALTER TABLE \`recipe\` CHANGE \`orderCount\` \`orderCount\` int NULL`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE \`recipe\` CHANGE \`orderCount\` \`orderCount\` int NOT NULL`);
        await queryRunner.query(`ALTER TABLE \`orders\` DROP COLUMN \`shippingFee\``);
        await queryRunner.query(`ALTER TABLE \`orders\` ADD \`shippingFee\` double NOT NULL`);
        await queryRunner.query(`ALTER TABLE \`orders\` DROP COLUMN \`itemsSubtotal\``);
        await queryRunner.query(`ALTER TABLE \`orders\` ADD \`itemsSubtotal\` double NOT NULL`);
    }

}
