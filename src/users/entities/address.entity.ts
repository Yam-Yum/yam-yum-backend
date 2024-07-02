import { User } from 'src/users/entities/user.entity';
import {
  Column,
  CreateDateColumn,
  Entity,
  JoinColumn,
  ManyToOne,
  PrimaryGeneratedColumn,
  Relation,
  Unique,
  UpdateDateColumn,
} from 'typeorm';

export enum AddressType {
  HOME = 'home',
  WORK = 'work',
  OTHER = 'other',
}

@Entity('address')
@Unique(['title', 'userId'])
export class Address {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column({ nullable: true })
  title: string;

  @Column('double')
  longtude: number;

  @Column('double')
  latitude: number;

  @Column()
  country: string;

  @Column()
  state: string;

  @Column({ nullable: true })
  city: string;

  @Column()
  street: string;

  @Column({ nullable: true })
  floor: string;

  @Column({ nullable: true })
  apartmentNumber: string;

  @Column({ nullable: true })
  houseNumber: string;

  @Column({ nullable: true })
  officeNumber: string;

  @Column({ nullable: true })
  additionalDirections: string;

  @Column({ nullable: true })
  postalCode: number;

  @Column({ type: 'enum', enum: AddressType, default: AddressType.HOME })
  addressType: AddressType;

  @Column({ name: 'userId', nullable: true })
  userId: string;

  @Column({ default: true })
  isActive: boolean;

  @CreateDateColumn()
  createdAt: Date;

  @UpdateDateColumn()
  updatedAt: Date;

  // Relations
  @ManyToOne(() => User, (user) => user.addresses, { nullable: true })
  @JoinColumn({ name: 'userId' })
  user: Relation<User>;
}
