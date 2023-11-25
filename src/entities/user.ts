import {
  Entity,
  Column,
  PrimaryColumn,
  CreateDateColumn,
  UpdateDateColumn,
  OneToMany,
} from "typeorm";
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

  @Column({ nullable: false })
  name!: string;

  @Column({ nullable: false, unique: true })
  email!: string;

  @Column({ nullable: false })
  lastLogin!: Date;

  @Column({ nullable: false })
  password!: string;

  @OneToMany(() => Phone, (phone) => phone.user, { onDelete: "CASCADE" })
  phones!: Phone[];

  constructor() {
    this.id = uuid();
  }
}
