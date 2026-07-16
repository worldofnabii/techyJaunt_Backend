import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  OneToOne,
  JoinColumn,
  CreateDateColumn,
} from "typeorm";
import { Booking } from "./Booking";

@Entity("payments")
export class Payment {
  @PrimaryGeneratedColumn("uuid")
  id!: string;

  @OneToOne(() => Booking)
  @JoinColumn()
  booking!: Booking;

  @Column({
    type: "decimal",
    precision: 10,
    scale: 2,
  })
  amount!: number;

  @Column()
  status!: string;

  @Column({
    nullable: true,
  })
  reference?: string;

  @CreateDateColumn({
    name: "created_at",
  })
  createdAt!: Date;
}