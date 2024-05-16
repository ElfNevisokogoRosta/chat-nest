import { MigrationInterface, QueryRunner } from "typeorm";

export class Chat1715876436584 implements MigrationInterface {
    name = 'Chat1715876436584'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`CREATE TABLE "user" ("id" SERIAL NOT NULL, "username" character varying NOT NULL, "email" character varying NOT NULL, "password" character varying NOT NULL, "created_at" character varying NOT NULL, "first_name" character varying, "last_name" character varying, "online" boolean NOT NULL, "last_time_active" character varying NOT NULL, CONSTRAINT "PK_cace4a159ff9f2512dd42373760" PRIMARY KEY ("id"))`);
        await queryRunner.query(`CREATE TABLE "chat" ("id" SERIAL NOT NULL, "chat_name" character varying NOT NULL, "created_at" character varying NOT NULL, "archived" boolean NOT NULL, "createdById" integer, CONSTRAINT "PK_9d0b2ba74336710fd31154738a5" PRIMARY KEY ("id"))`);
        await queryRunner.query(`CREATE TABLE "message" ("id" SERIAL NOT NULL, "created_at" character varying NOT NULL, "text" character varying, "image" character varying, "audion" character varying, "userId" integer, "chatId" integer, CONSTRAINT "PK_ba01f0a3e0123651915008bc578" PRIMARY KEY ("id"))`);
        await queryRunner.query(`CREATE TABLE "user_participant_chat_chat" ("userId" integer NOT NULL, "chatId" integer NOT NULL, CONSTRAINT "PK_e9b3dc6df91fde5d4c7912c7ff9" PRIMARY KEY ("userId", "chatId"))`);
        await queryRunner.query(`CREATE INDEX "IDX_92a321defe08887a830ffb538c" ON "user_participant_chat_chat" ("userId") `);
        await queryRunner.query(`CREATE INDEX "IDX_2bcb489a65179805c422188138" ON "user_participant_chat_chat" ("chatId") `);
        await queryRunner.query(`CREATE TABLE "chat_members_user" ("chatId" integer NOT NULL, "userId" integer NOT NULL, CONSTRAINT "PK_0659796185219b27cd0d7eadb48" PRIMARY KEY ("chatId", "userId"))`);
        await queryRunner.query(`CREATE INDEX "IDX_cd7edbaccbb127f22fecd29674" ON "chat_members_user" ("chatId") `);
        await queryRunner.query(`CREATE INDEX "IDX_c8c4e5bfdb28f12dc9a73dd3b5" ON "chat_members_user" ("userId") `);
        await queryRunner.query(`ALTER TABLE "chat" ADD CONSTRAINT "FK_1d6d6ef6d2b7b20dd032946aeec" FOREIGN KEY ("createdById") REFERENCES "user"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE "message" ADD CONSTRAINT "FK_446251f8ceb2132af01b68eb593" FOREIGN KEY ("userId") REFERENCES "user"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE "message" ADD CONSTRAINT "FK_619bc7b78eba833d2044153bacc" FOREIGN KEY ("chatId") REFERENCES "chat"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE "user_participant_chat_chat" ADD CONSTRAINT "FK_92a321defe08887a830ffb538c0" FOREIGN KEY ("userId") REFERENCES "user"("id") ON DELETE CASCADE ON UPDATE CASCADE`);
        await queryRunner.query(`ALTER TABLE "user_participant_chat_chat" ADD CONSTRAINT "FK_2bcb489a65179805c4221881386" FOREIGN KEY ("chatId") REFERENCES "chat"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE "chat_members_user" ADD CONSTRAINT "FK_cd7edbaccbb127f22fecd296743" FOREIGN KEY ("chatId") REFERENCES "chat"("id") ON DELETE CASCADE ON UPDATE CASCADE`);
        await queryRunner.query(`ALTER TABLE "chat_members_user" ADD CONSTRAINT "FK_c8c4e5bfdb28f12dc9a73dd3b57" FOREIGN KEY ("userId") REFERENCES "user"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "chat_members_user" DROP CONSTRAINT "FK_c8c4e5bfdb28f12dc9a73dd3b57"`);
        await queryRunner.query(`ALTER TABLE "chat_members_user" DROP CONSTRAINT "FK_cd7edbaccbb127f22fecd296743"`);
        await queryRunner.query(`ALTER TABLE "user_participant_chat_chat" DROP CONSTRAINT "FK_2bcb489a65179805c4221881386"`);
        await queryRunner.query(`ALTER TABLE "user_participant_chat_chat" DROP CONSTRAINT "FK_92a321defe08887a830ffb538c0"`);
        await queryRunner.query(`ALTER TABLE "message" DROP CONSTRAINT "FK_619bc7b78eba833d2044153bacc"`);
        await queryRunner.query(`ALTER TABLE "message" DROP CONSTRAINT "FK_446251f8ceb2132af01b68eb593"`);
        await queryRunner.query(`ALTER TABLE "chat" DROP CONSTRAINT "FK_1d6d6ef6d2b7b20dd032946aeec"`);
        await queryRunner.query(`DROP INDEX "public"."IDX_c8c4e5bfdb28f12dc9a73dd3b5"`);
        await queryRunner.query(`DROP INDEX "public"."IDX_cd7edbaccbb127f22fecd29674"`);
        await queryRunner.query(`DROP TABLE "chat_members_user"`);
        await queryRunner.query(`DROP INDEX "public"."IDX_2bcb489a65179805c422188138"`);
        await queryRunner.query(`DROP INDEX "public"."IDX_92a321defe08887a830ffb538c"`);
        await queryRunner.query(`DROP TABLE "user_participant_chat_chat"`);
        await queryRunner.query(`DROP TABLE "message"`);
        await queryRunner.query(`DROP TABLE "chat"`);
        await queryRunner.query(`DROP TABLE "user"`);
    }

}
