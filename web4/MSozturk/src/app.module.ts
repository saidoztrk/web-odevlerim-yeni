import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ProfilesModule } from './profiles/profiles.module';
import * as path from 'path';

@Module({
  imports: [
    TypeOrmModule.forRoot({
      type: 'sqlite',
      database: path.join(__dirname, 'Mozturk-profiles-v1.sqlite'), // Tam dosya yolunu kullan
      autoLoadEntities: true,
      synchronize: true,
    }),
    ProfilesModule,
  ],
})
export class AppModule { }
