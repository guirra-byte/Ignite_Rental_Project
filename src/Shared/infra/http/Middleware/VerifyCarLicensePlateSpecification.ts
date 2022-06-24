// //Informação se a placa do Carro existe
// //Precisamos de um carro existente para podermos cadastrar um Specification;

// import { CarRepository } from '../../../../modules/cars/repositories/implementations/CarRepository';

// import { Request, Response, NextFunction } from 'express';
// import { AppError } from '../Errors/AppError';

// const ensureCarLicensePlateExists = async (request: Request, response: Response, next: NextFunction) => {

//   const { car } = request.body;

//   let repository: CarRepository = CarRepository.getInstance();

//   const findLicensePlate = await repository
//     .findByLicensePlate();

//   if (!findLicensePlate) {

//     throw new AppError("Car does exists, try again");
//   }

//   next()

// }

// export { ensureCarLicensePlateExists }