import { Entity, Column, PrimaryColumn, ManyToOne } from "typeorm";
import { v4 as uuid } from "uuid";
import { User } from "./user";

@Entity()
export class Phone {
  @PrimaryColumn("uuid")
  id: string;

  @Column({ type: "string", nullable: false })
  ddd!: string;

  @Column({ type: "string", nullable: false })
  phoneNumber!: string;

  @ManyToOne(() => User, { nullable: false, onDelete: "CASCADE" })
  user!: User;

  constructor() {
    this.id = uuid();
  }
}
