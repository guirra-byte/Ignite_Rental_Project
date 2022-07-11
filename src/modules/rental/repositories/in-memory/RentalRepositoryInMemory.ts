import { Rental } from '../../model/rental';
import { IRentalRepository, IRequest } from '../IRentalRepository';

export class RentalRepositoryInMemory implements IRentalRepository {

  private repository: Rental[]

  constructor() {

    this.repository = [];
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

}