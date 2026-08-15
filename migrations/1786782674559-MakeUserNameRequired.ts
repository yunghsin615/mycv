import { MigrationInterface, QueryRunner } from 'typeorm';

export class MakeUserNameRequired1786782674559 implements MigrationInterface {
  name = 'MakeUserNameRequired1786782674559';

  public async up(queryRunner: QueryRunner): Promise<void> {
    // 必填欄位需要先把舊資料設值
    await queryRunner.query(
      `UPDATE "user" SET "name" = 'Unknown' WHERE "name" IS NULL`,
    );

    await queryRunner.query(
      `ALTER TABLE "user" ALTER COLUMN "name" SET NOT NULL`,
    );
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(
      `ALTER TABLE "user" ALTER COLUMN "name" DROP NOT NULL`,
    );
  }
}
