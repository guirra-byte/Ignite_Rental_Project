import { Router } from 'express';

import { VerifyUserAuthToken as ensureUserAuthToken } from '../Middleware/Token/Auth';
import { CreateRentalInstanceIndex } from '../../../../modules/rental/useCases/createRentals/index';

import { CreateDevolutionInstanceIndex } from '../../../../modules/rental/useCases/devolutions/index';

const rentalRoutes = Router();

rentalRoutes.post('/rental', ensureUserAuthToken, (request, response) => {

  return CreateRentalInstanceIndex(request, response);
});

rentalRoutes.post('/rentalDevolution', ensureUserAuthToken, (request, response) => {

  return CreateDevolutionInstanceIndex(request, response);
})

export { rentalRoutes }