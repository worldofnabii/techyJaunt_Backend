import "reflect-metadata";
import { DataSource } from "typeorm";
import dotenv from "dotenv";
import { User } from "../entities/User";
import { Wallet } from "../entities/Wallet";
import { Vehicle } from "../entities/Vehicle";
import { VehicleImage } from "../entities/VehicleImage";
import { Booking } from "../entities/Booking";
import { Payment } from "../entities/Payment";
import { WalletTransaction } from "../entities/WalletTransaction";
import { Withdrawal } from "../entities/Withdrawal";
import { Review } from "../entities/Review";
import { RefreshToken } from "../entities/RefreshToken";
import { AuditLog } from "../entities/AuditLog";

dotenv.config();

export const AppDataSource = new DataSource({
  type: "postgres",

  host: process.env.DATABASE_HOST,

  port: Number(process.env.DATABASE_PORT),

  username: process.env.DATABASE_USERNAME,

  password: process.env.DATABASE_PASSWORD,

  database: process.env.DATABASE_NAME,

  synchronize: false,

  logging: true,

  entities: [
    User, 
    Wallet, 
    Vehicle,
    VehicleImage,
    Booking,
    Payment,
    WalletTransaction,
    Withdrawal,
    Review,
    RefreshToken,
    AuditLog],

  migrations: ["src/migrations/*.ts"],

  subscribers: [],
});