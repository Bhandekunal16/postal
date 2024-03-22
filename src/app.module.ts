import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { CommonService } from './common/common.service';
import { AuthModule } from './auth/auth.module';
import { Neo4jModule } from 'nest-neo4j/dist';
import { Neo4jQueryService } from './neo4j-query/neo4j-query.service';
import { PostalModule } from './postal/postal.module';
import { MongooseModule } from '@nestjs/mongoose';
import { MongoService } from './mongo/mongo.service';

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
    MongooseModule.forRoot(
      'mongodb+srv://bhandekunal16:SppcHRFdBS74An8v@cluster0.xxevqv7.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0',
    ),
    PostalModule,
  ],
  controllers: [AppController],
  providers: [AppService, Neo4jQueryService, MongoService],
})
export class AppModule {}
