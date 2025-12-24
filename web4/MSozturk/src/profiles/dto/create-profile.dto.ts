import {
    IsEmail,
    IsNotEmpty,
    Matches,
    IsInt,
    Min,
} from 'class-validator';
import { Type } from 'class-transformer';

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

    @IsNotEmpty({ message: 'profileTypeId zorunludur' })
    @Type(() => Number)
    @IsInt({ message: 'profileTypeId bir tam sayı olmalıdır' })
    @Min(1, { message: 'profileTypeId 1 veya daha büyük olmalıdır' })
    profileTypeId: number;
}
