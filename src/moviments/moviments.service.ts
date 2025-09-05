import { Injectable } from '@nestjs/common';
import { validateOrReject } from 'class-validator';
import { CreateMovementsDto, UpdateMovementsDto } from 'src/dto/Movements.dto';
import { SuccessReturn } from 'src/lib/return-lib/return-lib';
import { tryCatch } from 'src/lib/try-catch/tryCatch';
import { PrismaService } from 'src/prisma/prisma.service';
import { MovimentFilterDto } from 'src/products/dto/Filter.dto';
import { UUID } from 'src/utils/validator';

@Injectable()
export class MovimentsService {
  constructor(private readonly prisma:PrismaService){}

  async create(dto:CreateMovementsDto){
    return await tryCatch(async()=>{
      await validateOrReject(dto)

      const res = await this.prisma.movements.create({
        data: dto
      })

      return SuccessReturn.Created(res,'Movimentação registrada com sucesso!')
    })
  }
  async update(id:string,dto:UpdateMovementsDto){
    return await tryCatch(async()=>{
      await validateOrReject(new UUID(id))
      await validateOrReject(dto)

      const res = await this.prisma.movements.update({
        where: { id: id },
        data: dto
      })

      return SuccessReturn.Ok(res, 'Movimentação atualizada com sucesso!')
    })
  }
  async delete(id:string){
    return await tryCatch(async()=>{
      await validateOrReject(new UUID(id))

      await this.prisma.movements.delete({
        where: { id: id }
      })

      return SuccessReturn.NoContent('Movimentação excluída com sucesso!')
    })
  }
  async get(id:string){
    return await tryCatch(async()=>{
      await validateOrReject(new UUID(id))

      const res = await this.prisma.movements.findUnique({
        where: { id: id }
      })

      return SuccessReturn.Ok(res, 'Movimentação encontrada com sucesso!')
    })
  }
  async getAll(dto:MovimentFilterDto){
    return await tryCatch(async()=>{
      await validateOrReject(dto)

      const res = await this.prisma.movements.findMany({
        where:{
          createdAt: {
            gte: dto.startDate,
            lte: dto.endDate
          }
        }
      })

      return SuccessReturn.Ok(res, 'Movimentações encontradas com sucesso!')
    })
  }
}
