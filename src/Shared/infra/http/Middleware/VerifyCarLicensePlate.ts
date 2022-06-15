import { Request, Response, NextFunction } from 'express';
import { ICarRepository } from '../../../../modules/cars/repositories/ICarRepository';
import { AppError } from '../Errors/AppError';

const VerifyCarLicensePlateAlreadyExists = async (request: Request, response: Response, next: NextFunction) => {

  let repository: ICarRepository;
  const { license_plate } = request.body;

  const verifyCarLicensePlate = await repository
    .findByLicensePlate(license_plate);

  if (verifyCarLicensePlate) {

    throw new AppError("License Plate are in use, try again");
  }

  next();
}

export { VerifyCarLicensePlateAlreadyExists }