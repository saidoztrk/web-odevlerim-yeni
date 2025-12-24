import { PartialType } from '@nestjs/mapped-types';
import { CreateProfileDto } from './create-profile.dto';
import {
    IsOptional,
    IsNotEmpty,
    Matches,
    IsEmail,
} from 'class-validator';

export class UpdateProfileDto extends PartialType(CreateProfileDto) {
    @IsOptional()
    @IsNotEmpty()
    username?: string;

    @IsOptional()
    @IsEmail()
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
}
