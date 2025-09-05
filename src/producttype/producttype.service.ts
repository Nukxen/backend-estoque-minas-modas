import { Injectable } from '@nestjs/common';
import { validateOrReject } from 'class-validator';
import { CreateProductTypeDto, UpdateProductTypeDto } from 'src/dto/ProductType.dto';
import { ErrorReturn, toHttpException } from 'src/lib/error-lib/error-lib';
import { SuccessReturn } from 'src/lib/return-lib/return-lib';
import { tryCatch } from 'src/lib/try-catch/tryCatch';
import { PrismaService } from 'src/prisma/prisma.service';
import { DeleteDto } from 'src/utils/delete.dto';
import { UUID } from 'src/utils/validator';

@Injectable()
export class ProducttypeService {
  constructor(private readonly prisma:PrismaService){}

  async create(dto:CreateProductTypeDto){
    return await tryCatch(async ()=>{
      await validateOrReject(dto)

      const res = await this.prisma.productType.create({
        data:dto
      })

      return SuccessReturn.Created<any>(res,'Tipo de produto adicionado com sucesso!')
    })
  }
  async update(id:string,dto:UpdateProductTypeDto){
    return await tryCatch(async ()=>{
      await validateOrReject(new UUID(id))
      await validateOrReject(dto)

      const res = this.prisma.productType.update({
        where:{
          id: id
        },
        data: dto
      })

      return SuccessReturn.Ok(res,'Tipo de produto atualizado com sucesso!')
    })
  }
  async delete(dto:DeleteDto){
    return await tryCatch(async ()=>{
      await validateOrReject(dto)

      if(dto.acessLevel=='USER'){
        throw toHttpException(ErrorReturn.Unauthorized({ message:"Você não tem permissão para deletar o tipo de produto."}))
      }

      await this.prisma.productType.delete({
        where:{
          id: dto.id
        }
      })

      return SuccessReturn.NoContent('Tipo de produto deletado com sucesso!')
    })
  }
  async get(id:string){
    return await tryCatch(async ()=>{
      await validateOrReject(new UUID(id))

      const res = await this.prisma.productType.findUnique({
        where:{
          id: id
        }
      })

      return SuccessReturn.Ok(res, 'Tipo de produto encontrado com sucesso!')
    })
  }
  async getAll(id:string){
    return await tryCatch(async ()=>{
      await validateOrReject(new UUID(id))

      const res = await this.prisma.productType.findMany({include:{
        Product: true
      }})

      return SuccessReturn.Ok(res, 'Tipo de produto e associações encontrados com sucesso!')
    })
  }
}
