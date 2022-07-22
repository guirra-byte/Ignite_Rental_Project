import { Rental } from '../../model/rental';
import { Car } from '../../../cars/model/Car';
import { User } from '../../../accounts/model/User';

import { IRentalRepository, IRequest } from '../IRentalRepository';

import { RequireAllRentalPropsDTO } from '../../Services/Data/RequireAllRentalPropsDTO';

export class RentalRepositoryInMemory implements IRentalRepository {

  private repository: Rental[];
  private userRepository: User[];
  private carRepository: Car[];

  constructor() {

    this.repository = [];
    this.userRepository = [];
    this.carRepository = [];
  }

  async createRental({ user_id, car_id, expect_return_date }: IRequest): Promise<void> {

    const createRental: Rental = new Rental();

    Object
      .assign(createRental,
        {
          user_id,
          car_id,
          expect_return_date,
          created_at: new Date(),
          start_date: new Date()
        });

    await this
      .repository
      .push(createRental);
  }

  async findOpenRentalByCar(car_id: string): Promise<Rental> {

    const findOpenRentalByCar = await this
      .repository
      .find((rental) => rental.car_id === car_id
        && rental.end_date === undefined);

    return findOpenRentalByCar;

  }

  async findOpenRentalByUser(user_id: string): Promise<Rental> {

    const findOpenRentalByUser = await this
      .repository
      .find((rental) => rental.user_id === user_id
        && rental.end_date === undefined);

    return findOpenRentalByUser;
  }

  async replaceTotal(final_value: number, rental_id: string): Promise<void> {

    const replaceRentalTotal: number = await this
      .repository
      .findIndex(async (rental) => rental.id === rental_id
        && rental.total === undefined);

    const rental = this.repository[replaceRentalTotal];

    Object
      .assign(rental, {
        total: final_value,
        updated_at: new Date()
      });

  }

  async findUserRentals(user_id: string): Promise<RequireAllRentalPropsDTO> {

    const findUserRentals = await this
      .repository
      .filter((rental) => (rental.user_id === user_id));

    const findUser = await this
      .userRepository
      .filter(async (user) => (user.id === user_id));

    const findCarByRental = await this
      .repository
      .findIndex(async (rental) => (rental.user_id === user_id));

    const { car_id } = this.repository[findCarByRental];

    const findCar = await this
      .carRepository
      .filter(async (car) => (car.id === car_id));

    const requireAllRentalProps = {

      user: findUser,
      car: findCar,
      rental: findUserRentals

    } as RequireAllRentalPropsDTO

    return requireAllRentalProps;
  }

}