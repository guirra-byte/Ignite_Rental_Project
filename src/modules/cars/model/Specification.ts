import { v4 as uuidV4 } from 'uuid'
import { Column, Entity, CreateDateColumn, PrimaryColumn } from 'typeorm';
//Código Duplicado 
//Verificar as situações e eventuais mudanças futuras
//implements ou extends


@Entity("specifications")
export class specification {

  @Column()
  name: string;

  @Column()
  description: string;

  @CreateDateColumn()
  created_at: Date;

  @PrimaryColumn()
  id?: string

  constructor() {

    if (!this.id) {

      this.id = uuidV4()
    }
  }
}

