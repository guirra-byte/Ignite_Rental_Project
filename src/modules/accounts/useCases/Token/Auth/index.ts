import { UserRepository } from '../../../repositories/implementations/UserRepository';
import { AuthUserUseCase } from './AuthUserUseCase';
import { AuthUserController } from './AuthUserController';

import { Request, Response } from 'express';

const EnsureUserAuthInstanceIndex = async (request: Request, response: Response) => {

  const userRepository = UserRepository.getInstance();

  const ensureUserAuthUseCase = new AuthUserUseCase(userRepository);

  const ensureUserAuthController = new AuthUserController(ensureUserAuthUseCase);

  await ensureUserAuthController
    .handle(request, response);

  return ensureUserAuthController;
}

export { EnsureUserAuthInstanceIndex }