import { ConfigModule, ConfigService } from '@nestjs/config';
import * as Entities from 'db/entity/index';

export default {
  imports: [ConfigModule],
  useFactory: async (configService: ConfigService): Promise<unknown> => ({
    type: configService.get('database.type'),
    host: configService.get('database.host'),
    port: configService.get('database.port'),
    username: configService.get('database.username'),
    password: configService.get('database.password'),
    database: configService.get('database.name'),
    entities: Object.values(Entities),
    synchronize: false,
    logging: ['error'],
    ssl: false,
  }),
  inject: [ConfigService],
};
