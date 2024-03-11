import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { CommonService } from './common/common.service';
import { AuthModule } from './auth/auth.module';
import { Neo4jModule } from 'nest-neo4j/dist';

@Module({
  imports: [
    AuthModule,
    Neo4jModule.forRoot({
      scheme: 'neo4j+s',
      host: process.env.HOST,
      port: process.env.PORT,
      username: 'neo4j',
      password: process.env.PASSWORD,
    }),
  ],
  controllers: [AppController],
  providers: [AppService, CommonService],
})
export class AppModule {}
