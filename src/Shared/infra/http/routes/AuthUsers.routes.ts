import { Router } from 'express';
import "../Shared/Container/index";

import { AuthUserController } from '@modules/accounts/useCases/Token/Auth/AuthUserController';

const authRoutes = Router();

const createAuthTokenUserController = new AuthUserController();
authRoutes.post('/session', createAuthTokenUserController.handle);


export { authRoutes }