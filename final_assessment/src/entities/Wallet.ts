import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  OneToOne,
  JoinColumn,
  CreateDateColumn,
  UpdateDateColumn,
} from "typeorm";
import { User } from "./User";

@Entity("wallets")
export class Wallet {
  @PrimaryGeneratedColumn("uuid")
  id!: string;

  @OneToOne(() => User)
  @JoinColumn()
  user!: User;

  @Column({
    name: "available_balance",
    type: "decimal",
    precision: 10,
    scale: 2,
    default: 0,
  })
  availableBalance!: number;

  @Column({
    name: "pending_balance",
    type: "decimal",
    precision: 10,
    scale: 2,
    default: 0,
  })
  pendingBalance!: number;

  @CreateDateColumn({
    name: "created_at",
  })
  createdAt!: Date;

  @UpdateDateColumn({
    name: "updated_at",
  })
  updatedAt!: Date;
}