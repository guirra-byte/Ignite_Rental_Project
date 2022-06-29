import { Router } from 'express';

import { VerifyUserAuthToken as ensureUserAuthToken } from '../Middleware/Token/Auth';
import { CreateRentalInstanceIndex } from '../../../../modules/rental/useCases/createRentals/index';

const rentalRoutes = Router();

rentalRoutes.post('/rental', ensureUserAuthToken, (request, response) => {

  return CreateRentalInstanceIndex(request, response);
});

export { rentalRoutes }