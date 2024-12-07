import {
  Entity,
  Column,
  PrimaryGeneratedColumn,
  CreateDateColumn,
  JoinColumn,
  OneToOne,
  Relation,
} from 'typeorm';
import { User } from '../../users/entities/user.entity';

export enum BusinessProfileRequestStatus {
  PENDING = 'pending',
  APPROVED = 'approved',
  REJECTED = 'rejected',
}

@Entity()
export class BusinessProfileRequest {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column()
  business_email: string;

  @Column({
    type: 'enum',
    enum: BusinessProfileRequestStatus,
    default: BusinessProfileRequestStatus.PENDING,
  })
  status: BusinessProfileRequestStatus;

  @CreateDateColumn()
  submitted_at: Date;

  @Column({ nullable: true })
  reviewed_at: Date;

  @OneToOne(() => User, { nullable: false })
  @JoinColumn({ name: 'userId' })
  user: Relation<User>;
}
