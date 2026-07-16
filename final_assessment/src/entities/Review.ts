import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  ManyToOne,
  CreateDateColumn,
} from "typeorm";
import { User } from "./User";
import { Vehicle } from "./Vehicle";

@Entity("reviews")
export class Review {
  @PrimaryGeneratedColumn("uuid")
  id!: string;

  @ManyToOne(() => User)
  customer!: User;

  @ManyToOne(() => Vehicle)
  vehicle!: Vehicle;

  @Column()
  rating!: number;

  @Column("text")
  comment!: string;

  @CreateDateColumn({
    name: "created_at",
  })
  createdAt!: Date;
}