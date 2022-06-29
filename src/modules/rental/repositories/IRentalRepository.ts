import { Rental } from '../model/rental';

export interface IRequest {

  user_id: string;
  car_id: string;
  expect_return_date: Date;
}

export interface IRentalRepository {

  createRental({ user_id, car_id, expect_return_date }: IRequest): Promise<void>
  findOpenRentalByCar(car_id: string): Promise<Rental>
  findOpenRentalByUser(user_id: string): Promise<Rental>

}