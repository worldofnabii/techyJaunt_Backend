import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  ManyToOne,
  CreateDateColumn,
} from "typeorm";
import { Wallet } from "./Wallet";

@Entity("withdrawals")
export class Withdrawal {
  @PrimaryGeneratedColumn("uuid")
  id!: string;

  @ManyToOne(() => Wallet)
  wallet!: Wallet;

  @Column({
    type: "decimal",
    precision: 10,
    scale: 2,
  })
  amount!: number;

  @Column({
    default: "pending",
  })
  status!: string;

  @CreateDateColumn({
    name: "created_at",
  })
  createdAt!: Date;
}