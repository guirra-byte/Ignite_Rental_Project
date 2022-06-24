import { response, Router } from 'express';

import { ensureAdmin } from '../Middleware/VerifyUserIsAdmin';
import { VerifyUserAuthToken as ensureAuthToken } from '../Middleware/Token/Auth';
import { ensureCarLicensePlateExists } from '../Middleware/VerifyCarLicensePlateSpecification';

import { CreateSpecificationInstanceIndex } from '../../../../modules/cars/useCases/createSpecification/index';

const specificationsRoutes = Router();

specificationsRoutes.post('/', ensureAuthToken, ensureAdmin, ensureCarLicensePlateExists, (request, response) => {

  return CreateSpecificationInstanceIndex(request, response);
});

export { specificationsRoutes }
