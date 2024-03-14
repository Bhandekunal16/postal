import { Module } from '@nestjs/common';
import { PostalService } from './postal.service';
import { PostalController } from './postal.controller';
import { Neo4jQueryService } from 'src/neo4j-query/neo4j-query.service';
import { PostalNeo4jService } from './postal-neo4j/postal-neo4j.service';

@Module({
  controllers: [PostalController],
  providers: [PostalService, Neo4jQueryService, PostalNeo4jService],
})
export class PostalModule {}
