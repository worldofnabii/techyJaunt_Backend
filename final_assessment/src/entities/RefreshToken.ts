import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  ManyToOne,
  CreateDateColumn,
} from "typeorm";
import { User } from "./User";

@Entity("refresh_tokens")
export class RefreshToken {
  @PrimaryGeneratedColumn("uuid")
  id!: string;

  @ManyToOne(() => User)
  user!: User;

  @Column()
  token!: string;

  @Column({
    name: "expires_at",
  })
  expiresAt!: Date;

  @CreateDateColumn({
    name: "created_at",
  })
  createdAt!: Date;
}