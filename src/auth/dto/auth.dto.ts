import { IsNotEmpty, IsEmail, MinLength } from 'class-validator';
export class AuthDto {
  @IsEmail()
  @IsNotEmpty()
  email: string;
  @IsNotEmpty()
  @MinLength(8)
  password: string;
  @IsNotEmpty()
  name: string;
}
