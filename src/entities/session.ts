import {
  Entity,
  PrimaryColumn,
  Column,
  OneToOne,
  UpdateDateColumn,
  JoinColumn,
} from "typeorm";
import { Exclude } from "class-transformer";
import { v4 as uuid } from "uuid";
import { User } from "./user";

@Entity()
export class Session {
  @PrimaryColumn("uuid")
  id: string;

  @UpdateDateColumn()
  lastConnection!: Date;

  @Exclude()
  @Column({ type: "boolean", nullable: false, default: true })
  isActive!: boolean;

  @OneToOne(() => User, (user) => user.session)
  @JoinColumn()
  user!: User;

  constructor() {
    this.id = uuid();
  }
}
