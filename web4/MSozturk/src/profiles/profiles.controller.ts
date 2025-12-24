import {
    Controller,
    Get,
    Post,
    Patch,
    Delete,
    Param,
    Body,
    ParseIntPipe,
    UseInterceptors,
    UploadedFile,
    BadRequestException,
} from '@nestjs/common';
import { ProfilesService } from './profiles.service';
import { CreateProfileDto } from './dto/create-profile.dto';
import { UpdateProfileDto } from './dto/update-profile.dto';
import { FileInterceptor } from '@nestjs/platform-express';
import { diskStorage } from 'multer';
import { extname } from 'path';
import { Express } from 'express';

// Yüklenen fotoğraflara random isim verme
function editFileName(
    req: Express.Request,
    file: Express.Multer.File,
    callback: (error: Error | null, filename: string) => void,
) {
    const name = file.originalname.split('.')[0];
    const fileExtName = extname(file.originalname);
    const randomName = Array(8)
        .fill(null)
        .map(() => Math.round(Math.random() * 16).toString(16))
        .join('');
    callback(null, `${name}-${randomName}${fileExtName}`);
}

// ===================== /profiles ======================
@Controller('profiles')
export class ProfilesController {
    constructor(private readonly profilesService: ProfilesService) { }

    @Get()
    findAll() {
        return this.profilesService.findAll();
    }

    @Get(':id')
    findOne(@Param('id', ParseIntPipe) id: number) {
        return this.profilesService.findOne(id);
    }

    @Post()
    @UseInterceptors(
        FileInterceptor('photo', {
            storage: diskStorage({
                destination: './uploads',
                filename: editFileName,
            }),
            limits: { fileSize: 5 * 1024 * 1024 }, // 5MB
        }),
    )
    async create(
        @Body() createProfileDto: CreateProfileDto,
        @UploadedFile() file: Express.Multer.File,
    ) {
        if (!file) {
            throw new BadRequestException('photo dosyası zorunludur');
        }

        const photoUrl = `/uploads/${file.filename}`;
        return this.profilesService.create(createProfileDto, photoUrl);
    }

    @Patch(':id')
    @UseInterceptors(
        FileInterceptor('photo', {
            storage: diskStorage({
                destination: './uploads',
                filename: editFileName,
            }),
        }),
    )
    async update(
        @Param('id', ParseIntPipe) id: number,
        @Body() updateProfileDto: UpdateProfileDto,
        @UploadedFile() file?: Express.Multer.File,
    ) {
        const photoUrl = file ? `/uploads/${file.filename}` : undefined;
        return this.profilesService.update(id, updateProfileDto, photoUrl);
    }

    @Delete(':id')
    remove(@Param('id', ParseIntPipe) id: number) {
        return this.profilesService.remove(id);
    }
}

// ================== /profileTypes =====================
@Controller('profileTypes')
export class ProfileTypesController {
    constructor(private readonly profilesService: ProfilesService) { }

    @Get()
    findAllProfileTypes() {
        return this.profilesService.findAllProfileTypes();
    }
}
