import {
  Entity,
  Column,
  PrimaryColumn,
  CreateDateColumn,
  UpdateDateColumn,
} from "typeorm";
import { Exclude } from "class-transformer";
import { v4 as uuid } from "uuid";

@Entity()
export class User {
  @PrimaryColumn("uuid")
  id: string;

  @CreateDateColumn()
  createdAt!: Date;

  @UpdateDateColumn()
  updatedAt!: Date;

  @Column({ type: "string", nullable: false })
  name!: string;

  @Column({ type: "string", nullable: false })
  email!: string;

  @Exclude()
  @Column({ type: "string", nullable: false })
  password!: string;

  constructor() {
    this.id = uuid();
  }
}
