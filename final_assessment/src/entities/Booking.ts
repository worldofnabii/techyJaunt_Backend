import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  ManyToOne,
  CreateDateColumn,
  UpdateDateColumn,
} from "typeorm";
import { User } from "./User";
import { Vehicle } from "./Vehicle";

@Entity("bookings")
export class Booking {
  @PrimaryGeneratedColumn("uuid")
  id!: string;

  @ManyToOne(() => User)
  customer!: User;

  @ManyToOne(() => Vehicle)
  vehicle!: Vehicle;

  @Column({
    name: "start_date",
    type: "date",
  })
  startDate!: Date;

  @Column({
    name: "end_date",
    type: "date",
  })
  endDate!: Date;

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

  @UpdateDateColumn({
    name: "updated_at",
  })
  updatedAt!: Date;
}