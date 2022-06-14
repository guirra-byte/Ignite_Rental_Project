import { v4 as uuidV4 } from 'uuid';
import { Column, CreateDateColumn, Entity, PrimaryColumn, Timestamp } from 'typeorm';

@Entity("categories")
export class Category {

  @Column()
  name: string;

  @Column()
  description: string;

  @CreateDateColumn()
  created_at: Date;

  @PrimaryColumn()
  id?: string; //Dizer que o Id é opcional

  constructor() {
    if (!this.id) { //Se não tiver nenhum id vindo junto ao Category this.id = uuidV4()
      this.id = uuidV4();
    }
  }
}
