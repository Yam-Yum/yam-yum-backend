import { MigrationInterface, QueryRunner } from "typeorm";

export class VideoLikesCountDefaultValue1722801324350 implements MigrationInterface {
    name = 'VideoLikesCountDefaultValue1722801324350'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE \`recipe_videos\` CHANGE \`likesCount\` \`likesCount\` int NOT NULL DEFAULT '0'`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE \`recipe_videos\` CHANGE \`likesCount\` \`likesCount\` int NOT NULL`);
    }

}
