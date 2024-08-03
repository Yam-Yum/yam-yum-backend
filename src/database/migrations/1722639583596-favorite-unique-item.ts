import { MigrationInterface, QueryRunner } from "typeorm";

export class FavoriteUniqueItem1722639583596 implements MigrationInterface {
    name = 'FavoriteUniqueItem1722639583596'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`CREATE UNIQUE INDEX \`IDX_c93f5cf158f8176ece6e7d1a37\` ON \`favorite_items\` (\`favoriteId\`, \`recipeId\`)`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`DROP INDEX \`IDX_c93f5cf158f8176ece6e7d1a37\` ON \`favorite_items\``);
    }

}
