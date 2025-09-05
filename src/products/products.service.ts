import { Injectable } from '@nestjs/common';
import { Prisma } from '@prisma/client';
import { validateOrReject } from 'class-validator';
import { CreateProductDto, UpdateProductDto } from 'src/dto/Product.dto';
import { SuccessReturn } from 'src/lib/return-lib/return-lib';
import { tryCatch } from 'src/lib/try-catch/tryCatch';
import { PrismaService } from 'src/prisma/prisma.service';
import { FilterDto } from 'src/products/dto/Filter.dto';
import { UUID } from 'src/utils/validator';

@Injectable()
export class ProductsService {
  constructor(private readonly prisma:PrismaService){}

  async create(dto:CreateProductDto){
    return await tryCatch(async()=>{
      await validateOrReject(dto)

      const res = await this.prisma.product.create({
        data:dto
      })

      return SuccessReturn.Created(res,'Produto criado com sucesso!')
    })
  }

  async update(id:string,dto:UpdateProductDto){
    return await tryCatch(async()=>{
      await validateOrReject(new UUID(id))
      await validateOrReject(dto)

      const res = await this.prisma.product.update({
        where:{
          id
        },
        data:dto
      })

      return SuccessReturn.Ok(res, 'Produto atualizado com sucesso!')
    })
  }

  async delete(id:string){
    return await tryCatch(async()=>{
      await validateOrReject(new UUID(id))

      await this.prisma.product.delete({
        where:{
          id
        }
      })

      return SuccessReturn.NoContent( 'Produto deletado com sucesso!')
    })
  }

  async getAll(Filter:FilterDto){
    await validateOrReject(Filter)

    const WhereInput:Prisma.ProductWhereInput = {

    }

    if(Filter.name){
      WhereInput.name = {
        contains: Filter.name
      }
    }
    if(Filter.priceInterval){
      WhereInput.price = {
        gte: Filter.priceInterval[0],
        lte: Filter.priceInterval[1]
      }
    }
    if(Filter.type){
      WhereInput.productTypeId = Filter.type
    }


    const res = await this.prisma.product.findMany({
      where:WhereInput,
      orderBy:{
        createdAt: 'desc'
      }
    })

    if(res.length == 0){
      return SuccessReturn.NoContent('Produtos não encontrados nesse filtro!')
    }

    return SuccessReturn.Ok(res, 'Produtos encontrados com sucesso!')
  }

}
