import {
  Column,
  CreateDateColumn,
  Entity,
  OneToMany,
  OneToOne,
  PrimaryGeneratedColumn,
  Relation,
  UpdateDateColumn,
} from 'typeorm';
import { Registration } from './registration.entity';
import { RefreshToken } from './refresh_token.entity';
import { Address } from './address.entity';
export enum UserRole {
  ADMIN = 'admin',
  ClIENT = 'client',
  CHIEF = 'chief',
  GUEST = 'guest',
}

export enum UserGender {
  MALE = 'male',
  FEMALE = 'female',
}

@Entity('users')
export class User {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column()
  firstName: string;

  @Column()
  lastName: string;

  @Column({ unique: true })
  username: string;

  @Column({ unique: true })
  email: string;

  @Column({ unique: true })
  phoneNumber: string;

  @Column()
  password: string;

  @Column({ nullable: true })
  profilePicture: string;

  @Column({
    type: 'enum',
    enum: UserRole,
    default: UserRole.GUEST,
  })
  role: UserRole;

  @Column({
    type: 'enum',
    enum: UserGender,
    default: UserGender.MALE,
  })
  gender: UserGender;

  @Column()
  dateOfBirth: Date;

  @CreateDateColumn()
  createdAt: Date;

  @UpdateDateColumn()
  updatedAt: Date;

  // Relations
  @OneToOne(() => RefreshToken, (refreshToken) => refreshToken.user)
  refreshToken: Relation<RefreshToken>;

  @OneToOne(() => Registration, (registration) => registration.user)
  registration: Relation<Registration>;

  @OneToMany(() => Address, (address) => address.user)
  addresses: Relation<Address>[];
}
