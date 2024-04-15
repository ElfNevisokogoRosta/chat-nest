import { MigrationInterface, QueryRunner } from "typeorm";

export class Init1711359019010 implements MigrationInterface {
    name = 'Init1711359019010'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`CREATE TABLE "user" ("id" SERIAL NOT NULL, "username" character varying NOT NULL, "email" character varying NOT NULL, "password" character varying NOT NULL, "created_at" character varying NOT NULL, "first_name" character varying, "last_name" character varying, "online" boolean NOT NULL, "last_time_active" character varying NOT NULL, CONSTRAINT "PK_cace4a159ff9f2512dd42373760" PRIMARY KEY ("id"))`);
        await queryRunner.query(`CREATE TABLE "chat" ("id" SERIAL NOT NULL, "chat_name" character varying NOT NULL, "created_at" character varying NOT NULL, "archived" boolean NOT NULL, "adminId" integer, "createdById" integer, CONSTRAINT "PK_9d0b2ba74336710fd31154738a5" PRIMARY KEY ("id"))`);
        await queryRunner.query(`CREATE TABLE "message" ("id" SERIAL NOT NULL, "text" character varying NOT NULL, "image" character varying NOT NULL, "audion" character varying NOT NULL, "chatId" integer, CONSTRAINT "PK_ba01f0a3e0123651915008bc578" PRIMARY KEY ("id"))`);
        await queryRunner.query(`CREATE TABLE "user_participant_chat_chat" ("userId" integer NOT NULL, "chatId" integer NOT NULL, CONSTRAINT "PK_e9b3dc6df91fde5d4c7912c7ff9" PRIMARY KEY ("userId", "chatId"))`);
        await queryRunner.query(`CREATE INDEX "IDX_92a321defe08887a830ffb538c" ON "user_participant_chat_chat" ("userId") `);
        await queryRunner.query(`CREATE INDEX "IDX_2bcb489a65179805c422188138" ON "user_participant_chat_chat" ("chatId") `);
        await queryRunner.query(`ALTER TABLE "chat" ADD CONSTRAINT "FK_338e1e9cdacd1d28d7ca9999d8d" FOREIGN KEY ("adminId") REFERENCES "user"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE "chat" ADD CONSTRAINT "FK_1d6d6ef6d2b7b20dd032946aeec" FOREIGN KEY ("createdById") REFERENCES "user"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE "message" ADD CONSTRAINT "FK_619bc7b78eba833d2044153bacc" FOREIGN KEY ("chatId") REFERENCES "chat"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE "user_participant_chat_chat" ADD CONSTRAINT "FK_92a321defe08887a830ffb538c0" FOREIGN KEY ("userId") REFERENCES "user"("id") ON DELETE CASCADE ON UPDATE CASCADE`);
        await queryRunner.query(`ALTER TABLE "user_participant_chat_chat" ADD CONSTRAINT "FK_2bcb489a65179805c4221881386" FOREIGN KEY ("chatId") REFERENCES "chat"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "user_participant_chat_chat" DROP CONSTRAINT "FK_2bcb489a65179805c4221881386"`);
        await queryRunner.query(`ALTER TABLE "user_participant_chat_chat" DROP CONSTRAINT "FK_92a321defe08887a830ffb538c0"`);
        await queryRunner.query(`ALTER TABLE "message" DROP CONSTRAINT "FK_619bc7b78eba833d2044153bacc"`);
        await queryRunner.query(`ALTER TABLE "chat" DROP CONSTRAINT "FK_1d6d6ef6d2b7b20dd032946aeec"`);
        await queryRunner.query(`ALTER TABLE "chat" DROP CONSTRAINT "FK_338e1e9cdacd1d28d7ca9999d8d"`);
        await queryRunner.query(`DROP INDEX "public"."IDX_2bcb489a65179805c422188138"`);
        await queryRunner.query(`DROP INDEX "public"."IDX_92a321defe08887a830ffb538c"`);
        await queryRunner.query(`DROP TABLE "user_participant_chat_chat"`);
        await queryRunner.query(`DROP TABLE "message"`);
        await queryRunner.query(`DROP TABLE "chat"`);
        await queryRunner.query(`DROP TABLE "user"`);
    }

}
