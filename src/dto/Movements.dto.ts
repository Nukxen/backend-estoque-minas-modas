import { ApiProperty,PartialType } from '@nestjs/swagger';
import { IsString, IsNumber, IsBoolean, IsDate, IsEnum, IsOptional, IsArray, IsUUID, IsJSON, IsNotEmpty } from 'class-validator';
import { Type } from 'class-transformer';

export class CreateMovementsDto {
  @ApiProperty({ name: 'value', description: 'value.' })
  @IsNotEmpty()
  @Type(() => Number)
  @IsNumber()
  value: number;

  @ApiProperty({ name: 'additionalInfo', description: 'additionalInfo.' })
  @IsOptional()
  @IsString()
  additionalInfo?: string;

  @ApiProperty({ name: 'productId', description: 'productId.' })
  @IsNotEmpty()
  @IsString()
  productId: string;

  @ApiProperty({ name: 'userId', description: 'userId.' })
  @IsNotEmpty()
  @IsString()
  userId: string;

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
export class UpdateMovementsDto extends PartialType(CreateMovementsDto) {}