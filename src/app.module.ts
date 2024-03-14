import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { CommonService } from './common/common.service';
import { AuthModule } from './auth/auth.module';
import { Neo4jModule } from 'nest-neo4j/dist';
import { Neo4jQueryModule } from './neo4j-query/neo4j-query.module';
import { Neo4jQueryService } from './neo4j-query/neo4j-query.service';
import { PostalModule } from './postal/postal.module';

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
    Neo4jQueryModule,
    PostalModule,
  ],
  controllers: [AppController],
  providers: [AppService, CommonService, Neo4jQueryService],
})
export class AppModule {}
