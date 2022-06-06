import { ApiProperty } from '@nestjs/swagger';
import { IsString, Length, IsEmail } from 'class-validator';

export class CreateUserDto {
    @ApiProperty({example: 'email@domain.com', description: 'Email пользователя'})
    @IsString({message: 'Должно быть строкой!'})
    @IsEmail({}, {message: 'Некорректный email'})
    readonly email: string;

    @ApiProperty({description: 'Пароль пользователя'})
    @IsString({message: 'Должно быть строкой!'})
    @Length(4, 16, {message: 'Не меньше 4 и не больше 16'})
    readonly password: string;
}