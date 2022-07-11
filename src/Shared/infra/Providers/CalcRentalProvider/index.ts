import { CalcProvider } from "./implementations/CalcProvider";

import { RentalRepository } from '../../../../modules/rental/repositories/implementation/RentalRepository';
import { DateProvider } from '../DateProvider/implementations/DateProvider';


const RequireCalcProvider = async () => {

  const rentalRepository: RentalRepository = RentalRepository.getInstance();
  const dateProvider: DateProvider = new DateProvider();

  const calcProvider: CalcProvider = new CalcProvider(rentalRepository, dateProvider);

  return calcProvider.resolve;
}

export { RequireCalcProvider }

