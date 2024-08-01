import { MigrationInterface, QueryRunner } from "typeorm";

export class FavoriteRecipes1722467981261 implements MigrationInterface {
    name = 'FavoriteRecipes1722467981261'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`CREATE TABLE \`user_favorite_recipes\` (\`recipeId\` varchar(36) NOT NULL, \`usersId\` varchar(36) NOT NULL, INDEX \`IDX_4d929d6023fd5fb9596de7b83e\` (\`recipeId\`), INDEX \`IDX_a03db2671e70967dcaaccd5d1b\` (\`usersId\`), PRIMARY KEY (\`recipeId\`, \`usersId\`)) ENGINE=InnoDB`);
        await queryRunner.query(`ALTER TABLE \`user_favorite_recipes\` ADD CONSTRAINT \`FK_4d929d6023fd5fb9596de7b83ee\` FOREIGN KEY (\`recipeId\`) REFERENCES \`recipe\`(\`id\`) ON DELETE CASCADE ON UPDATE CASCADE`);
        await queryRunner.query(`ALTER TABLE \`user_favorite_recipes\` ADD CONSTRAINT \`FK_a03db2671e70967dcaaccd5d1be\` FOREIGN KEY (\`usersId\`) REFERENCES \`users\`(\`id\`) ON DELETE NO ACTION ON UPDATE NO ACTION`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE \`user_favorite_recipes\` DROP FOREIGN KEY \`FK_a03db2671e70967dcaaccd5d1be\``);
        await queryRunner.query(`ALTER TABLE \`user_favorite_recipes\` DROP FOREIGN KEY \`FK_4d929d6023fd5fb9596de7b83ee\``);
        await queryRunner.query(`DROP INDEX \`IDX_a03db2671e70967dcaaccd5d1b\` ON \`user_favorite_recipes\``);
        await queryRunner.query(`DROP INDEX \`IDX_4d929d6023fd5fb9596de7b83e\` ON \`user_favorite_recipes\``);
        await queryRunner.query(`DROP TABLE \`user_favorite_recipes\``);
    }

}
