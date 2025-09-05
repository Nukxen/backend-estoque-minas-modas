import { enum_acess_level } from "@prisma/client";
import { IsEnum, IsNotEmpty, IsUUID } from "class-validator";

export class DeleteDto {
  @IsEnum(enum_acess_level)
  @IsNotEmpty()
  acessLevel: enum_acess_level

  @IsUUID()
  @IsNotEmpty()
  id: string;
}
