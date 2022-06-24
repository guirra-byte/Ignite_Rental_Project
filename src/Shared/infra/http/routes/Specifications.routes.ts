import { response, Router } from 'express';

import { ensureAdmin } from '../Middleware/VerifyUserIsAdmin';
import { VerifyUserAuthToken as ensureAuthToken } from '../Middleware/Token/Auth';

import { CreateSpecificationInstanceIndex } from '../../../../modules/cars/useCases/createSpecification/index';
import { FindAllSpecificationsInstanceIndex } from '../../../../modules/cars/useCases/findAllSpecifications/index';

const specificationsRoutes = Router();

specificationsRoutes.post('/', ensureAuthToken, ensureAdmin, (request, response) => {

  return CreateSpecificationInstanceIndex(request, response);
});

specificationsRoutes.get('/findAllSpecs', (request, response) => {

  return FindAllSpecificationsInstanceIndex(request, response);
})

export { specificationsRoutes }
