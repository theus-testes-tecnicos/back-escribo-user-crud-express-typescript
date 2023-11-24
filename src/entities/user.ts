import {
  Entity,
  Column,
  PrimaryColumn,
  CreateDateColumn,
  UpdateDateColumn,
  OneToMany,
} from "typeorm";
import { Exclude } from "class-transformer";
import { v4 as uuid } from "uuid";
import { Phone } from "./phone";

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

  @OneToMany(() => Phone, (phone) => phone.user, { onDelete: "CASCADE" })
  phones!: Phone[];

  constructor() {
    this.id = uuid();
  }
}
