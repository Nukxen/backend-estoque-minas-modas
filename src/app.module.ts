import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { PrismaModule } from './prisma/prisma.module';
import { UsersModule } from './users/users.module';
import { MovimentsModule } from './moviments/moviments.module';
import { ProductsModule } from './products/products.module';
import { ProducttypeModule } from './producttype/producttype.module';

@Module({
  imports: [PrismaModule, UsersModule, MovimentsModule, ProductsModule, ProducttypeModule],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
