import { response, Router } from 'express';

import { CreateSpecificationInstanceIndex } from '../../../../modules/cars/useCases/createSpecification/index';

const specificationsRoutes = Router();

specificationsRoutes.post('/', (request, response) => {

  return CreateSpecificationInstanceIndex(request, response);
});

export { specificationsRoutes }
