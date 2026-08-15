import { MigrationInterface, QueryRunner } from "typeorm";

export class AddUserNameAndReportColor1786781334424 implements MigrationInterface {
    name = 'AddUserNameAndReportColor1786781334424'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "user" ADD "name" character varying`);
        await queryRunner.query(`ALTER TABLE "report" ADD "color" character varying`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "report" DROP COLUMN "color"`);
        await queryRunner.query(`ALTER TABLE "user" DROP COLUMN "name"`);
    }

}
