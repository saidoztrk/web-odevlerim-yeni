import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import {
    ProfilesController,
    ProfileTypesController,
} from './profiles.controller';
import { ProfilesService } from './profiles.service';
import { Profile } from './entities/profile.entity';
import { ProfileType } from './entities/profile-type.entity';

@Module({
    imports: [TypeOrmModule.forFeature([Profile, ProfileType])],
    controllers: [ProfilesController, ProfileTypesController],
    providers: [ProfilesService],
})
export class ProfilesModule { }
