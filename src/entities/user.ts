import {
  Entity,
  Column,
  PrimaryColumn,
  CreateDateColumn,
  UpdateDateColumn,
  OneToMany,
  OneToOne,
  JoinColumn,
} from "typeorm";
import { Exclude } from "class-transformer";
import { v4 as uuid } from "uuid";
import { Phone } from "./phone";
import { Session } from "./session";

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

  @Column({ nullable: false })
  email!: string;

  @Exclude()
  @Column({ nullable: false })
  password!: string;

  @OneToMany(() => Phone, (phone) => phone.user, { onDelete: "CASCADE" })
  phones!: Phone[];

  @OneToOne(() => Session, (session) => session.user, { onDelete: "CASCADE" })
  @JoinColumn()
  lastConnection!: Session;

  constructor() {
    this.id = uuid();
  }
}
