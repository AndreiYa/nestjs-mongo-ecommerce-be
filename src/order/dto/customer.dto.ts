import {IsNotEmpty, IsString} from "class-validator";

export class CustomerDto {
  @IsString()
  @IsNotEmpty()
  phone: string;

  @IsString()
  @IsNotEmpty()
  name: string;
}
