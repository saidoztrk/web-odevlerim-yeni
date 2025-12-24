import {
    Entity,
    PrimaryGeneratedColumn,
    Column,
    ManyToOne,
} from 'typeorm';
import { ProfileType } from './profile-type.entity';

@Entity()
export class Profile {
    @PrimaryGeneratedColumn()
    id: number;

    @Column()
    username: string;

    @Column()
    password: string;

    @Column({ unique: true })
    email: string;

    @Column()
    photo: string; // /uploads/... şeklinde URL

    @ManyToOne(() => ProfileType, (profileType) => profileType.profiles, {
        eager: true, // GET /profiles çağrısında otomatik join
    })
    profileType: ProfileType;
}
