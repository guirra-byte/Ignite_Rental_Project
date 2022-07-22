import { Rental } from '../model/rental';
import { RequireAllRentalPropsDTO } from '../Services/Data/RequireAllRentalPropsDTO';

export interface IRequest {

  user_id: string;
  car_id: string;
  expect_return_date: Date;
}

export interface IRentalRepository {

  createRental({ user_id, car_id, expect_return_date }: IRequest): Promise<void>
  findOpenRentalByCar(car_id: string): Promise<Rental>
  findOpenRentalByUser(user_id: string): Promise<Rental>
  replaceTotal(final_value: number, rental_id: string): Promise<void>
  findUserRentals(user_id: string): Promise<Rental[] | RequireAllRentalPropsDTO>

}