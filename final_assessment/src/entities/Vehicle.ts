import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  ManyToOne,
  CreateDateColumn,
  UpdateDateColumn,
} from "typeorm";
import { User } from "./User";

@Entity("vehicles")
export class Vehicle {
  @PrimaryGeneratedColumn("uuid")
  id!: string;

  @ManyToOne(() => User)
  owner!: User;

  @Column()
  brand!: string;

  @Column()
  model!: string;

  @Column()
  year!: number;

  @Column({
    unique: true,
  })
  vin!: string;

  @Column({
    name: "engine_type",
  })
  engineType!: string;

  @Column({
    name: "fuel_type",
  })
  fuelType!: string;

  @Column()
  transmission!: string;

  @Column({
    name: "daily_price",
    type: "decimal",
    precision: 10,
    scale: 2,
  })
  dailyPrice!: number;

  @Column("text")
  description!: string;

  @Column()
  address!: string;

  @Column({
    default: true,
  })
  available!: boolean;

  @Column({
    default: false,
  })
  paused!: boolean;

  @CreateDateColumn({
    name: "created_at",
  })
  createdAt!: Date;

  @UpdateDateColumn({
    name: "updated_at",
  })
  updatedAt!: Date;
}