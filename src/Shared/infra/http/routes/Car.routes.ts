import { Router } from 'express';

import { verifyUserIsAdmin } from '../Middleware/VerifyUserIsAdmin';

import { CreateCarInstanceIndex } from '../../../../modules/cars/useCases/createCar/index';
import { FindOneCarInstanceIndex } from '../../../../modules/cars/useCases/findOneCar/index';
import { FindAllCarsInstanceIndex } from '../../../../modules/cars/useCases/findAllCars/index';
import { VerifyCarLicensePlateAlreadyExists as verifyCarLicensePlateAlreadyExists } from '../Middleware/VerifyCarLicensePlate';

const carRoutes = Router();

carRoutes.post('/', verifyUserIsAdmin, verifyCarLicensePlateAlreadyExists, (request, response) => {

  return CreateCarInstanceIndex(request, response);
});

carRoutes.get('/', (request, response) => {

  return FindOneCarInstanceIndex(request, response);
});

carRoutes.get('/allCars', (request, response) => {

  return FindAllCarsInstanceIndex(request, response);
})

export { carRoutes }