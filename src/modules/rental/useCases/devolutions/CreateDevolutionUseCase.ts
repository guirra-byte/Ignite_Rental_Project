import { IUserRepository } from '../../../accounts/repositories/IUserRepository';
import { ICarRepository } from '../../../cars/repositories/ICarRepository';
import { IRentalRepository } from '../../repositories/IRentalRepository';

import { AppError } from '../../../../Shared/infra/http/Errors/AppError';

import { IDateProvider } from '../../../../Shared/infra/Providers/DateProvider/IDateProvider';

interface IRequest {

  user_id: string
  rental_id: string
  car_id: string

}

interface IRentalRequest {

  rental_id: string,
  totalToPay: number,
  user: {
    nameAccess: string,
    driver_license: string,
    email: string,
    username: string
  },
  car: {
    name: string,
    brand: string,
    category_id: string,
    description: string
  }
}

export class CreateDevolutionUseCase {

  constructor(
    private userRepository: IUserRepository,
    private carRepository: ICarRepository,
    private rentalRepository: IRentalRepository,
    private requireDateProvider: IDateProvider) { }

  async execute(data: IRequest): Promise<IRentalRequest> {

    const minDaily = 1;
    let totalToPay: number = 0;

    const requireUserProps = await this
      .userRepository
      .findById(data.user_id);

    if (!requireUserProps) {

      throw new AppError("User does exists!");
    }

    const ensureOpenRentalByUser = await this
      .rentalRepository
      .findOpenRentalByUser(data.user_id);

    if (!ensureOpenRentalByUser) {

      throw new AppError("User does have a rental in progress!");
    }

    const requireCarProps = await this
      .carRepository
      .findById(data.car_id);

    if (!requireCarProps) {

      throw new AppError("Car does exists!");
    }

    const ensureOpenRentalByCar = await this
      .rentalRepository
      .findOpenRentalByCar(data.car_id);

    if (!ensureOpenRentalByCar) {

      throw new AppError("Car does have a rental in progress!");
    }

    //Para podermos calcular a multa devemos:
    //Saber a diferença entre o expect_return_date e o return_date(Data atual)
    //Se o return_date for maior que o expect_return_date significa 
    //que o espaço de tempo da  devolução do aluguel foi maior que o estipulado;

    const { daily_rate, fine_amount } = requireCarProps;
    const { expect_return_date, start_date } = ensureOpenRentalByCar;

    //Data atual da requisição da devoluçã
    const dateNow: Date = await this
      .requireDateProvider
      .dateNow();

    let daily = await this.requireDateProvider
      .compareInDays(start_date, dateNow);

    if (daily <= 0) {

      daily = minDaily;
    }

    const delay = await this
      .requireDateProvider
      .compareInDays(dateNow, expect_return_date);

    if (delay > 0) {

      const lateFee: number = (fine_amount * delay);
      const totalRental: number = (fine_amount * daily);

      totalToPay = (lateFee + totalRental);

      await this
        .rentalRepository
        .replaceTotal(totalToPay, ensureOpenRentalByUser.id);
    }

    totalToPay = totalToPay + (daily_rate * daily);

    await this
      .rentalRepository
      .replaceTotal(totalToPay, ensureOpenRentalByUser.id);

    await this
      .carRepository
      .replaceAvailable(ensureOpenRentalByCar.car_id, true);

    const car = await this
      .carRepository
      .findById(ensureOpenRentalByCar.car_id);

    const { brand, category_id, description, name } = car;

    const user = await this
      .userRepository
      .findById(ensureOpenRentalByUser.user_id);

    const { name: nameAccess, driver_license, email, username } = user;

    const requireRentalInfos: IRentalRequest = {

      rental_id: ensureOpenRentalByUser.id,
      totalToPay: totalToPay,
      user: {
        nameAccess,
        driver_license,
        email,
        username
      },
      car: {
        name,
        brand,
        category_id,
        description
      },
    }

    return requireRentalInfos;
  }
}