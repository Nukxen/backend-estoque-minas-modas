import { ApiProperty,PartialType } from '@nestjs/swagger';
import { IsString, IsNumber, IsBoolean, IsDate, IsEnum, IsOptional, IsArray, IsUUID, IsJSON, IsNotEmpty } from 'class-validator';
import { Transform } from 'class-transformer';

export class CreateMovementsDto {
  @ApiProperty({ name: 'id', description: 'id.' })
  @IsOptional()
  @IsString()
  id?: string;

  @ApiProperty({ name: 'value', description: 'value.' })
  @IsNotEmpty()
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
  @IsDate()
  @Transform(({ value }) => new Date(value))
  createdAt?: Date;

  @ApiProperty({ name: 'updatedAt', description: 'updatedAt.' })
  @IsOptional()
  @IsDate()
  @Transform(({ value }) => new Date(value))
  updatedAt?: Date;

}
export class UpdateMovementsDto extends PartialType(CreateMovementsDto) {}