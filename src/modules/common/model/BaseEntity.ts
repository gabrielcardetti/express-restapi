import {
  PrimaryGeneratedColumn,
  Column,
  CreateDateColumn,
  UpdateDateColumn
} from "typeorm";
import { Exclude } from 'class-transformer';

export class BaseEntity {
  @PrimaryGeneratedColumn()
  id: number;

  @Exclude({ toPlainOnly: true })
  @Column()
  @CreateDateColumn()
  createdAt: Date;

  @Exclude({ toPlainOnly: true })
  @Column()
  @UpdateDateColumn()
  updatedAt: Date;

  @Exclude({ toPlainOnly: true })
  @Column({ default: false })
  deleted: boolean;

}