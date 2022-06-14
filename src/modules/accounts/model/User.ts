import { Column, CreateDateColumn, Entity, PrimaryColumn } from "typeorm";
import { v4 as uuidV4 } from 'uuid';

@Entity("users")
export class User {

  @PrimaryColumn()
  id?: string

  @Column()
  name: string

  @Column()
  password: string

  @Column()
  email: string

  @Column()
  driver_license: string

  @Column()
  isAdmin: boolean

  @CreateDateColumn()
  created_at: Date

  @Column()
  avatar: string

  constructor() {

    this.isAdmin = false;

    if (!this.id) {

      this.id = uuidV4();
    }
  }
}