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

function editFileName(req, file, callback) {
    const name = file.originalname.split('.')[0];
    const fileExtName = extname(file.originalname);
    const randomName = Array(8)
        .fill(null)
        .map(() => Math.round(Math.random() * 16).toString(16))
        .join('');
    callback(null, `${name}-${randomName}${fileExtName}`);
}

@Controller('profiles')
export class ProfilesController {
    constructor(private readonly profilesService: ProfilesService) { }

    // GET /profiles
    @Get()
    findAll() {
        return this.profilesService.findAll();
    }

    // GET /profiles/:id
    @Get(':id')
    findOne(@Param('id', ParseIntPipe) id: number) {
        return this.profilesService.findOne(id);
    }

    // POST /profiles
    @Post()
    @UseInterceptors(
        FileInterceptor('photo', {
            storage: diskStorage({
                destination: './uploads',
                filename: editFileName,
            }),
            limits: { fileSize: 5 * 1024 * 1024 },
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

    // PATCH /profiles/:id
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

    // DELETE /profiles/:id
    @Delete(':id')
    remove(@Param('id', ParseIntPipe) id: number) {
        return this.profilesService.remove(id);
    }
}
