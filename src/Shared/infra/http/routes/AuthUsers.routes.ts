import { Router } from 'express';
import { EnsureUserAuthInstanceIndex } from '../../../../modules/accounts/useCases/Token/Auth/index';

const authRoutes = Router();

authRoutes.post('/session', (request, response) => {

  return EnsureUserAuthInstanceIndex(request, response);
});


export { authRoutes }