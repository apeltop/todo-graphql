import { INestApplication, Injectable, OnModuleInit } from '@nestjs/common';
import { PrismaClient } from '@prisma/client';

@Injectable()
export class PrismaService extends PrismaClient implements OnModuleInit {
  constructor() {
    super({
      log: ['query', 'info', 'warn', 'error'],
      errorFormat: 'pretty',
    });

    // @ts-ignore
    this.$on<any>('query', (e: Prisma.QueryEvent) => {
      // console.log('Query: ' + e.query);
      // console.log('Params: ' + e.params)
      // console.log('Duration: ' + e.duration + 'ms');
    })
  }

  async onModuleInit() {
    await this.$connect();
  }

  async enableShutdownHooks(app: INestApplication) {
    // @ts-ignore
    this.$on('beforeExit', async () => {
      await app.close();
    });
  }
}
