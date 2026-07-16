import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  ManyToOne,
  CreateDateColumn,
} from "typeorm";
import { Wallet } from "./Wallet";

@Entity("wallet_transactions")
export class WalletTransaction {
  @PrimaryGeneratedColumn("uuid")
  id!: string;

  @ManyToOne(() => Wallet)
  wallet!: Wallet;

  @Column()
  type!: string;

  @Column({
    type: "decimal",
    precision: 10,
    scale: 2,
  })
  amount!: number;

  @CreateDateColumn({
    name: "created_at",
  })
  createdAt!: Date;
}