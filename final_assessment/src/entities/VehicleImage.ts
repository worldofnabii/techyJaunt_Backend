import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  ManyToOne,
} from "typeorm";
import { Vehicle } from "./Vehicle";

@Entity("vehicle_images")
export class VehicleImage {
  @PrimaryGeneratedColumn("uuid")
  id!: string;

  @ManyToOne(() => Vehicle)
  vehicle!: Vehicle;

  @Column()
  imageUrl!: string;
}