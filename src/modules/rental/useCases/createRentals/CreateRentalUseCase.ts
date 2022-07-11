import { IRentalRepository } from '../../repositories/IRentalRepository';
import { ICarRepository } from '../../../cars/repositories/ICarRepository';
import { IRequest } from '../../repositories/IRentalRepository';
import { AppError } from '../../../../Shared/infra/http/Errors/AppError';

import { IDateProvider } from '../../../../Shared/infra/Providers/DateProvider/IDateProvider';

export class CreateRentalUseCase {

  constructor(
    private rentalRepository: IRentalRepository,
    private carRepository: ICarRepository,
    private returnDateProvider: IDateProvider) { }

  async execute(data: IRequest): Promise<void> {

    const minTime: number = 24;

    //Não deve ser possível cadastrar um novo aluguel 
    //para um Carro que possui a operação de aluguel em aberto;

    const carUnavailable = await this
      .rentalRepository
      .findOpenRentalByCar(data.car_id);

    if (carUnavailable) {

      throw new AppError("Car is Unavailable!");
    }

    //Não deve ser possível cadastrar um novo aluguel 
    //para um User que já possua um aluguel em aberto;

    const rentalOpenToUser = await this
      .rentalRepository
      .findOpenRentalByUser(data.user_id);

    if (rentalOpenToUser) {

      throw new AppError("This User have a Rental in progress!");
    }

    //Instanciação do Provider de Dates
    //Provider return Data type Number
    const returnCompareDatesProvider = await this
      .returnDateProvider
      .compareInHour(data.expect_return_date);

    if (returnCompareDatesProvider < minTime) {

      throw new AppError("Invalid return date time");
    }

    const findCar = await this
      .carRepository
      .findById(data.car_id);

    await this
      .carRepository
      .replaceAvailable(findCar.id, false);

    await this
      .rentalRepository
      .createRental({
        car_id: data.car_id,
        user_id: data.user_id,
        expect_return_date: data.expect_return_date
      });
  }
}