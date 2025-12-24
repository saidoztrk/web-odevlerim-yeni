import {
    Injectable,
    NotFoundException,
    BadRequestException,
} from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Profile } from './entities/profile.entity';
import { CreateProfileDto } from './dto/create-profile.dto';
import { UpdateProfileDto } from './dto/update-profile.dto';

@Injectable()
export class ProfilesService {
    constructor(
        @InjectRepository(Profile)
        private readonly profileRepo: Repository<Profile>,
    ) { }

    private checkPasswordsMatch(password?: string, confirmPassword?: string) {
        if (password !== undefined) {
            if (!confirmPassword) {
                throw new BadRequestException(
                    'confirmPassword alanı zorunludur',
                );
            }
            if (password !== confirmPassword) {
                throw new BadRequestException(
                    'password ve confirmPassword aynı olmalıdır',
                );
            }
        }
    }

    async create(dto: CreateProfileDto, photoUrl: string): Promise<Profile> {
        this.checkPasswordsMatch(dto.password, dto.confirmPassword);

        const profile = this.profileRepo.create({
            username: dto.username,
            email: dto.email,
            password: dto.password,
            photo: photoUrl,
        });

        return this.profileRepo.save(profile);
    }

    findAll(): Promise<Profile[]> {
        return this.profileRepo.find();
    }

    async findOne(id: number): Promise<Profile> {
        const profile = await this.profileRepo.findOne({ where: { id } });
        if (!profile) throw new NotFoundException('Profile bulunamadı');
        return profile;
    }

    async update(
        id: number,
        dto: UpdateProfileDto,
        photoUrl?: string,
    ): Promise<Profile> {
        const profile = await this.findOne(id);

        if (dto.password) {
            this.checkPasswordsMatch(dto.password, dto.confirmPassword);
            profile.password = dto.password;
        }

        if (dto.username !== undefined) profile.username = dto.username;
        if (dto.email !== undefined) profile.email = dto.email;
        if (photoUrl) profile.photo = photoUrl;

        return this.profileRepo.save(profile);
    }

    async remove(id: number): Promise<void> {
        const profile = await this.findOne(id);
        await this.profileRepo.remove(profile);
    }
}
