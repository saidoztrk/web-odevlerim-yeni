import {
    Injectable,
    NotFoundException,
    BadRequestException,
    OnModuleInit,
} from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Profile } from './entities/profile.entity';
import { ProfileType } from './entities/profile-type.entity';
import { CreateProfileDto } from './dto/create-profile.dto';
import { UpdateProfileDto } from './dto/update-profile.dto';

@Injectable()
export class ProfilesService implements OnModuleInit {
    constructor(
        @InjectRepository(Profile)
        private readonly profileRepo: Repository<Profile>,
        @InjectRepository(ProfileType)
        private readonly profileTypeRepo: Repository<ProfileType>,
    ) { }

    // Uygulama başladığında profil tiplerini seed et
    async onModuleInit() {
        await this.seedProfileTypes();
    }

    // Profil tiplerini veritabanına ekle (yoksa)
    private async seedProfileTypes() {
        const existingTypes = await this.profileTypeRepo.find();

        if (existingTypes.length === 0) {
            const defaultTypes = [
                { name: 'Admin' },
                { name: 'User' },
                { name: 'Moderator' },
                { name: 'Guest' },
            ];

            const typesToInsert = this.profileTypeRepo.create(defaultTypes);
            await this.profileTypeRepo.save(typesToInsert);
            console.log('Profil tipleri başarıyla eklendi:', defaultTypes.map(t => t.name).join(', '));
        }
    }

    // Şifre & confirmPassword eşleşmesi
    private checkPasswordsMatch(
        password?: string,
        confirmPassword?: string,
    ) {
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

    // Tüm ProfileType kayıtları
    async findAllProfileTypes(): Promise<ProfileType[]> {
        return this.profileTypeRepo.find();
    }

    // profileTypeId doğrulama
    private async getProfileTypeOrThrow(
        id: number,
    ): Promise<ProfileType> {
        const pt = await this.profileTypeRepo.findOne({ where: { id } });
        if (!pt) {
            throw new BadRequestException('Geçersiz profileTypeId');
        }
        return pt;
    }

    // CREATE
    async create(
        dto: CreateProfileDto,
        photoUrl: string,
    ): Promise<Profile> {
        this.checkPasswordsMatch(dto.password, dto.confirmPassword);

        const profileType = await this.getProfileTypeOrThrow(
            dto.profileTypeId,
        );

        const profile = this.profileRepo.create({
            username: dto.username,
            email: dto.email,
            password: dto.password,
            photo: photoUrl,
            profileType,
        });

        return this.profileRepo.save(profile);
    }

    // READ – list
    async findAll(): Promise<Profile[]> {
        // eager: true sayesinde profileType otomatik gelir
        return this.profileRepo.find();
    }

    // READ – single
    async findOne(id: number): Promise<Profile> {
        const profile = await this.profileRepo.findOne({ where: { id } });
        if (!profile) {
            throw new NotFoundException('Profile bulunamadı');
        }
        return profile;
    }

    // UPDATE
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

        if (dto.profileTypeId !== undefined) {
            const profileType = await this.getProfileTypeOrThrow(
                dto.profileTypeId,
            );
            profile.profileType = profileType;
        }

        if (photoUrl) {
            profile.photo = photoUrl;
        }

        return this.profileRepo.save(profile);
    }

    // DELETE
    async remove(id: number): Promise<void> {
        const profile = await this.findOne(id);
        await this.profileRepo.remove(profile);
    }
}
