import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  ManyToOne,
  CreateDateColumn,
} from "typeorm";
import { User } from "./User";

@Entity("audit_logs")
export class AuditLog {
  @PrimaryGeneratedColumn("uuid")
  id!: string;

  @ManyToOne(() => User)
  user!: User;

  @Column()
  action!: string;

  @Column("text")
  description!: string;

  @CreateDateColumn({
    name: "created_at",
  })
  createdAt!: Date;
}