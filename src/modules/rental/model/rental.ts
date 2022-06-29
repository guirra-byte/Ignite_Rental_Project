import { v4 as uuidV4 } from 'uuid';

export class Rental {

  id: string;
  start_date: Date;
  end_date?: Date;
  expect_return_date: Date;
  total?: number;
  created_at: Date;
  updated_at?: Date;
  user_id: string;
  car_id: string;

  constructor(id?: string) {

    this.id = id ?? uuidV4();

  }
}