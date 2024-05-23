import { MigrationInterface, QueryRunner } from "typeorm";

export class Chat1716185261401 implements MigrationInterface {
    name = 'Chat1716185261401'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`CREATE TABLE "user" ("id" SERIAL NOT NULL, "username" character varying NOT NULL, "email" character varying NOT NULL, "password" character varying NOT NULL, "created_at" character varying NOT NULL, "first_name" character varying, "last_name" character varying, "online" boolean NOT NULL, "last_time_active" character varying NOT NULL, CONSTRAINT "PK_cace4a159ff9f2512dd42373760" PRIMARY KEY ("id"))`);
        await queryRunner.query(`CREATE TABLE "chat" ("id" SERIAL NOT NULL, "chat_name" text NOT NULL, "type" character varying NOT NULL DEFAULT 'private', "created_at" character varying NOT NULL, "archived" boolean NOT NULL, "createdById" integer, CONSTRAINT "PK_9d0b2ba74336710fd31154738a5" PRIMARY KEY ("id"))`);
        await queryRunner.query(`CREATE TABLE "message" ("id" SERIAL NOT NULL, "created_at" character varying NOT NULL, "text" character varying, "image" character varying, "audion" character varying, "userId" integer, "chatId" integer, CONSTRAINT "PK_ba01f0a3e0123651915008bc578" PRIMARY KEY ("id"))`);
        await queryRunner.query(`CREATE TABLE "user_friends_user" ("userId_1" integer NOT NULL, "userId_2" integer NOT NULL, CONSTRAINT "PK_f2b5631d91f6b7fda632135932f" PRIMARY KEY ("userId_1", "userId_2"))`);
        await queryRunner.query(`CREATE INDEX "IDX_04840fd160b733de706a336013" ON "user_friends_user" ("userId_1") `);
        await queryRunner.query(`CREATE INDEX "IDX_e81f236c989f3fd54836b50a12" ON "user_friends_user" ("userId_2") `);
        await queryRunner.query(`CREATE TABLE "user_participant_chat_chat" ("userId" integer NOT NULL, "chatId" integer NOT NULL, CONSTRAINT "PK_e9b3dc6df91fde5d4c7912c7ff9" PRIMARY KEY ("userId", "chatId"))`);
        await queryRunner.query(`CREATE INDEX "IDX_92a321defe08887a830ffb538c" ON "user_participant_chat_chat" ("userId") `);
        await queryRunner.query(`CREATE INDEX "IDX_2bcb489a65179805c422188138" ON "user_participant_chat_chat" ("chatId") `);
        await queryRunner.query(`CREATE TABLE "chat_members_user" ("chatId" integer NOT NULL, "userId" integer NOT NULL, CONSTRAINT "PK_0659796185219b27cd0d7eadb48" PRIMARY KEY ("chatId", "userId"))`);
        await queryRunner.query(`CREATE INDEX "IDX_cd7edbaccbb127f22fecd29674" ON "chat_members_user" ("chatId") `);
        await queryRunner.query(`CREATE INDEX "IDX_c8c4e5bfdb28f12dc9a73dd3b5" ON "chat_members_user" ("userId") `);
        await queryRunner.query(`ALTER TABLE "chat" ADD CONSTRAINT "FK_1d6d6ef6d2b7b20dd032946aeec" FOREIGN KEY ("createdById") REFERENCES "user"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE "message" ADD CONSTRAINT "FK_446251f8ceb2132af01b68eb593" FOREIGN KEY ("userId") REFERENCES "user"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE "message" ADD CONSTRAINT "FK_619bc7b78eba833d2044153bacc" FOREIGN KEY ("chatId") REFERENCES "chat"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE "user_friends_user" ADD CONSTRAINT "FK_04840fd160b733de706a3360134" FOREIGN KEY ("userId_1") REFERENCES "user"("id") ON DELETE CASCADE ON UPDATE CASCADE`);
        await queryRunner.query(`ALTER TABLE "user_friends_user" ADD CONSTRAINT "FK_e81f236c989f3fd54836b50a12d" FOREIGN KEY ("userId_2") REFERENCES "user"("id") ON DELETE CASCADE ON UPDATE CASCADE`);
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
        await queryRunner.query(`ALTER TABLE "user_friends_user" DROP CONSTRAINT "FK_e81f236c989f3fd54836b50a12d"`);
        await queryRunner.query(`ALTER TABLE "user_friends_user" DROP CONSTRAINT "FK_04840fd160b733de706a3360134"`);
        await queryRunner.query(`ALTER TABLE "message" DROP CONSTRAINT "FK_619bc7b78eba833d2044153bacc"`);
        await queryRunner.query(`ALTER TABLE "message" DROP CONSTRAINT "FK_446251f8ceb2132af01b68eb593"`);
        await queryRunner.query(`ALTER TABLE "chat" DROP CONSTRAINT "FK_1d6d6ef6d2b7b20dd032946aeec"`);
        await queryRunner.query(`DROP INDEX "public"."IDX_c8c4e5bfdb28f12dc9a73dd3b5"`);
        await queryRunner.query(`DROP INDEX "public"."IDX_cd7edbaccbb127f22fecd29674"`);
        await queryRunner.query(`DROP TABLE "chat_members_user"`);
        await queryRunner.query(`DROP INDEX "public"."IDX_2bcb489a65179805c422188138"`);
        await queryRunner.query(`DROP INDEX "public"."IDX_92a321defe08887a830ffb538c"`);
        await queryRunner.query(`DROP TABLE "user_participant_chat_chat"`);
        await queryRunner.query(`DROP INDEX "public"."IDX_e81f236c989f3fd54836b50a12"`);
        await queryRunner.query(`DROP INDEX "public"."IDX_04840fd160b733de706a336013"`);
        await queryRunner.query(`DROP TABLE "user_friends_user"`);
        await queryRunner.query(`DROP TABLE "message"`);
        await queryRunner.query(`DROP TABLE "chat"`);
        await queryRunner.query(`DROP TABLE "user"`);
    }

}
