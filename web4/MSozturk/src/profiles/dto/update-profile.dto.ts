import { PartialType } from '@nestjs/mapped-types';
import { CreateProfileDto } from './create-profile.dto';
import {
    IsOptional,
    IsNotEmpty,
    IsEmail,
    Matches,
    IsInt,
    Min,
} from 'class-validator';
import { Type } from 'class-transformer';

export class UpdateProfileDto extends PartialType(CreateProfileDto) {
    @IsOptional()
    @IsNotEmpty()
    username?: string;

    @IsOptional()
    @IsEmail({}, { message: 'Geçerli bir email giriniz' })
    email?: string;

    @IsOptional()
    @Matches(
        /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[^A-Za-z0-9]).{8,}$/,
        {
            message:
                'Şifre en az bir büyük harf, bir küçük harf, bir sayı ve bir sembol içermelidir',
        },
    )
    password?: string;

    @IsOptional()
    confirmPassword?: string;

    @IsOptional()
    @Type(() => Number)
    @IsInt({ message: 'profileTypeId bir tam sayı olmalıdır' })
    @Min(1, { message: 'profileTypeId 1 veya daha büyük olmalıdır' })
    profileTypeId?: number;
}
