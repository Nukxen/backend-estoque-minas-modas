import { Injectable } from '@nestjs/common';
import { hash, verify } from 'argon2';
import { validateOrReject } from 'class-validator';
import { CreateUserDto, UpdateUserDto } from 'src/dto/User.dto';
import { ErrorReturn, toHttpException } from 'src/lib/error-lib/error-lib';
import { SuccessReturn } from 'src/lib/return-lib/return-lib';
import { tryCatch } from 'src/lib/try-catch/tryCatch';
import { PrismaService } from 'src/prisma/prisma.service';
import { UserDeleteDto } from 'src/users/dto/userDelete.dto';
import { UserLoginDto } from 'src/users/dto/userLogin.dto';
import { ARGON_OPTS, PEPPER } from 'src/utils/env';
import { UUID } from 'src/utils/validator';

@Injectable()
export class UsersService {
  constructor(private readonly prisma:PrismaService){}
  async login(dto:UserLoginDto){
    return await tryCatch(async()=>{
      await validateOrReject(dto)

      const user = await this.prisma.user.findUnique({
        where:{
          username:dto.username
        }
      })

      if(!user){
        return toHttpException(ErrorReturn.NotFound({ message:'Usuario não encontrado!'}))
      }

      const ok = await verify(user.passwordHash, dto.password + PEPPER);

      if(!ok){
        return toHttpException(ErrorReturn.NotFound({ message:'Senha incorreta!'}))
      }
      const { id,userLevel,username } = user
      return SuccessReturn.Ok<any>({id,userLevel,username},'Login realizado com sucesso!')
    })
  }
  async create(dto:CreateUserDto){
    return await tryCatch(async()=>{
      await validateOrReject(dto)

      dto.passwordHash = await hash(dto.passwordHash+PEPPER,ARGON_OPTS)

      const data = await this.prisma.user.create({
        data:dto,select: { id: true, username: true, userLevel: true, createdAt: true },
      })

      return SuccessReturn.Ok<any>(data,'Usuario criado com sucesso!')
    })
  }
  async update(id:string, dto:UpdateUserDto){
    return await tryCatch(async()=>{
      const validId = new UUID()
      validId.id = id
      await validateOrReject(validId)
      await validateOrReject(dto)

      if(dto.passwordHash){
        dto.passwordHash = await hash(dto.passwordHash+PEPPER,ARGON_OPTS)
      }

      const data = await this.prisma.user.update({
        data:dto,
        where:{id:id}
      })

      return SuccessReturn.Ok<any>(data,'Usuario criado com sucesso!')
    })
  }
  async delete(id:UserDeleteDto){
    return await tryCatch(async()=>{
      await validateOrReject(id)

      if(id.acessLevel === 'USER'){
        throw toHttpException(ErrorReturn.Unauthorized({ message: "Você não pode realizar essa ação!"}))
      }

      this.prisma.user.delete({
        where:{id:id.id}
      })

      return SuccessReturn.NoContent('Usuario deletado com sucesso!')
    })
  }
}
