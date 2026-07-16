import {
    Entity,
    PrimaryGeneratedColumn,
    Column,
    CreateDateColumn,
    UpdateDateColumn,
} from "typeorm";

import { UserRole } from "../types/enums";

@Entity("users")
export class User {

    @PrimaryGeneratedColumn("uuid")
    id!: string;

    @Column({
        name: "first_name"
    })
    firstName!: string;

    @Column({
        name: "last_name"
    })
    lastName!: string;

    @Column({
        unique: true
    })
    email!: string;

    @Column({
        unique: true,
        nullable: true
    })
    phone?: string;

    @Column({
        name: "password_hash",
        select: false
    })
    passwordHash!: string;

    @Column({
        type: "enum",
        enum: UserRole,
        default: UserRole.CUSTOMER
    })
    role!: UserRole;

    @Column({
        nullable: true,
        name: "profile_image"
    })
    profileImage?: string;

    @Column({
        name: "is_verified",
        default: false
    })
    isVerified!: boolean;

    @Column({
        name: "is_suspended",
        default: false
    })
    isSuspended!: boolean;

    @CreateDateColumn({
        name: "created_at"
    })
    createdAt!: Date;

    @UpdateDateColumn({
        name: "updated_at"
    })
    updatedAt!: Date;

}