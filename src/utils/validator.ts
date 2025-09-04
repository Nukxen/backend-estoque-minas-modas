import { IsNotEmpty, IsUUID } from "class-validator";

export class UUID {
  @IsUUID()
  @IsNotEmpty()
  id:string
}
