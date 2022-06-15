import { v4 as uuidV4 } from 'uuid';

export class Category {

  name: string;
  description: string;
  created_at: Date;
  id?: string;

  constructor(id?: string) {

    this.id = id ?? uuidV4();
  }
}
