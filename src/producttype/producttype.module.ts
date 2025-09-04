import { Module } from '@nestjs/common';
import { ProducttypeService } from './producttype.service';
import { ProducttypeController } from './producttype.controller';

@Module({
  controllers: [ProducttypeController],
  providers: [ProducttypeService],
})
export class ProducttypeModule {}
