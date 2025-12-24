import { IsEmail, IsNotEmpty, Matches } from 'class-validator';

export class CreateProfileDto {
    @IsNotEmpty({ message: 'username zorunludur' })
    username: string;

    @IsNotEmpty({ message: 'email zorunludur' })
    @IsEmail({}, { message: 'Geçerli bir email giriniz' })
    email: string;

    @IsNotEmpty({ message: 'password zorunludur' })
    @Matches(
        /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[^A-Za-z0-9]).{8,}$/,
        {
            message:
                'Şifre en az 8 karakter olmalı ve en az bir büyük harf, bir küçük harf, bir sayı ve bir sembol içermelidir',
        },
    )
    password: string;

    @IsNotEmpty({ message: 'confirmPassword zorunludur' })
    confirmPassword: string;
}
