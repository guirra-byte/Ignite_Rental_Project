import { v4 as uuidV4 } from 'uuid';

export class CarImages {

  image_name: string
  car_id: string
  created_at: Date
  id?: string

  constructor(id?: string) {

    this.id = id ?? uuidV4();
  }
}