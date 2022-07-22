import { ICalcProvider } from "../ICalcProvider";
import { ICarRepository } from '../../../../../modules/cars/repositories/ICarRepository';
import { IRentalRepository } from '../../../../../modules/rental/repositories/IRentalRepository';

import { IDateProvider } from "../../DateProvider/IDateProvider";

export class CalcProvider implements ICalcProvider {

  constructor(
    private requireDateProvider: IDateProvider) { }

  async resolve(daily_rate: number, return_date: Date): Promise<number> {

    //Implementar a comparação de Dates
    //Utilizar o dayjs

    const requireCompareDates: number = await this
      .requireDateProvider
      .compareInHour(return_date);

    const calcRental: number = (daily_rate * requireCompareDates);

    return calcRental;
  }
}