import {IsNotEmpty, IsString} from "class-validator";

export class BrandDto {
  @IsString()
  @IsNotEmpty()
  name: string;

  @IsString()
  @IsNotEmpty()
  description: string;

  @IsString()
  @IsNotEmpty()
  origin: string;
}
