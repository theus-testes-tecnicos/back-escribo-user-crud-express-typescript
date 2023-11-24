import { MigrationInterface, QueryRunner } from "typeorm";

export class Initial1700839133657 implements MigrationInterface {
    name = 'Initial1700839133657'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`CREATE TABLE "phone" ("id" uuid NOT NULL, "ddd" character varying NOT NULL, "phoneNumber" character varying NOT NULL, "userId" uuid NOT NULL, CONSTRAINT "PK_f35e6ee6c1232ce6462505c2b25" PRIMARY KEY ("id"))`);
        await queryRunner.query(`CREATE TABLE "user" ("id" uuid NOT NULL, "createdAt" TIMESTAMP NOT NULL DEFAULT now(), "updatedAt" TIMESTAMP NOT NULL DEFAULT now(), "name" character varying NOT NULL, "email" character varying NOT NULL, "password" character varying NOT NULL, "lastConnectionId" uuid, CONSTRAINT "REL_0eae061a3bde23b9d39db8854c" UNIQUE ("lastConnectionId"), CONSTRAINT "PK_cace4a159ff9f2512dd42373760" PRIMARY KEY ("id"))`);
        await queryRunner.query(`CREATE TABLE "session" ("id" uuid NOT NULL, "lastConnection" TIMESTAMP NOT NULL DEFAULT now(), "isActive" boolean NOT NULL DEFAULT true, "userId" uuid, CONSTRAINT "REL_3d2f174ef04fb312fdebd0ddc5" UNIQUE ("userId"), CONSTRAINT "PK_f55da76ac1c3ac420f444d2ff11" PRIMARY KEY ("id"))`);
        await queryRunner.query(`ALTER TABLE "phone" ADD CONSTRAINT "FK_260d7031e6bd9ed4fbcd2dd3ad6" FOREIGN KEY ("userId") REFERENCES "user"("id") ON DELETE CASCADE ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE "user" ADD CONSTRAINT "FK_0eae061a3bde23b9d39db8854cf" FOREIGN KEY ("lastConnectionId") REFERENCES "session"("id") ON DELETE CASCADE ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE "session" ADD CONSTRAINT "FK_3d2f174ef04fb312fdebd0ddc53" FOREIGN KEY ("userId") REFERENCES "user"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "session" DROP CONSTRAINT "FK_3d2f174ef04fb312fdebd0ddc53"`);
        await queryRunner.query(`ALTER TABLE "user" DROP CONSTRAINT "FK_0eae061a3bde23b9d39db8854cf"`);
        await queryRunner.query(`ALTER TABLE "phone" DROP CONSTRAINT "FK_260d7031e6bd9ed4fbcd2dd3ad6"`);
        await queryRunner.query(`DROP TABLE "session"`);
        await queryRunner.query(`DROP TABLE "user"`);
        await queryRunner.query(`DROP TABLE "phone"`);
    }

}
