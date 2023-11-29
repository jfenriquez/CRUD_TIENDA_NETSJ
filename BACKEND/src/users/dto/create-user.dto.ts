import { IsEmail, IsNotEmpty, IsString, IsEmpty } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';

export class CreateUserDto {
  @IsNotEmpty() @IsString() @ApiProperty() readonly nombre: string;
  @IsNotEmpty() @IsString() @ApiProperty() readonly apellido: string;
  @IsNotEmpty() @IsEmail() @ApiProperty() readonly email: string;
  @IsNotEmpty() @IsString() @ApiProperty() readonly password: string;
  @IsNotEmpty() @IsString() @ApiProperty() readonly rol: string;
}
