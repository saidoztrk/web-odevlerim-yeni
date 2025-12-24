import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ProfilesModule } from './profiles/profiles.module';

@Module({
  imports: [
    TypeOrmModule.forRoot({
      type: 'sqlite',
      database: 'ceng307-odev3.sqlite',
      autoLoadEntities: true,
      synchronize: true, // ödev için yeterli
    }),
    ProfilesModule,
  ],
})
export class AppModule { }
