import { v4 as uuidV4 } from 'uuid';
import { Car } from './Car';

export class specification {

  name: string;
  description: string;
  created_at: Date;
  id?: string;
  car_id: string

  constructor(id?: string) {

    this.id = id ?? uuidV4();
  }
}

