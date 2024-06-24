import { Column, Entity, JoinColumn, OneToOne, PrimaryGeneratedColumn, Relation } from 'typeorm';
import { User } from './user.entity';

@Entity('phone_numbers')
export class Registration {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column({ unique: true })
  phoneNumber: string;

  @Column()
  otp: string;

  @Column()
  otpExpireIn: Date;

  @Column()
  otpConfirmed: boolean;

  @Column({ default: false })
  verified: boolean;

  @OneToOne(() => User, (user) => user.registration, {
    onDelete: 'CASCADE',
    nullable: true,
  })
  @JoinColumn({ name: 'userId' })
  user: Relation<User>;
}
