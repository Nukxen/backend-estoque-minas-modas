import { ApiProperty,PartialType } from '@nestjs/swagger';
import { IsString, IsNumber, IsBoolean, IsDate, IsEnum, IsOptional, IsArray, IsUUID, IsJSON, IsNotEmpty } from 'class-validator';
import { Type } from 'class-transformer';
import { enum_acess_level } from './enums/enum_acess_level';

export class CreateUserDto {
  @ApiProperty({ name: 'username', description: 'username.' })
  @IsNotEmpty()
  @IsString()
  username: string;

  @ApiProperty({ name: 'passwordHash', description: 'passwordHash.' })
  @IsNotEmpty()
  @IsString()
  passwordHash: string;

  @ApiProperty({ name: 'userLevel', description: 'userLevel.' })
  @IsOptional()
  @IsEnum(enum_acess_level)
  userLevel?: enum_acess_level;

  @ApiProperty({ name: 'createdAt', description: 'createdAt.' })
  @IsOptional()
  @Type(() => Date)
  @IsDate()
  createdAt?: Date;

  @ApiProperty({ name: 'updatedAt', description: 'updatedAt.' })
  @IsOptional()
  @Type(() => Date)
  @IsDate()
  updatedAt?: Date;

}
export class UpdateUserDto extends PartialType(CreateUserDto) {}