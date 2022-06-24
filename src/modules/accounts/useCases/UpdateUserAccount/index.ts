import { UserRepository } from '../../repositories/implementations/UserRepository';
import { UpdateUserAvatarUseCase } from './UpdateUserAvatarUseCase';
import { UpdateUserAvatarController } from './UpdateUserAvatarController';


import { Request, Response } from 'express';

const UpdateUserAvatarInstanceIndex = async (request: Request, response: Response) => {

  const userRepository = UserRepository.getInstance();

  const updateUserAvatarUseCase = new UpdateUserAvatarUseCase(userRepository);

  const updateUserAvatarController = new UpdateUserAvatarController(updateUserAvatarUseCase);

  await updateUserAvatarController
    .handle(request, response);

  return updateUserAvatarController;
}

export { UpdateUserAvatarInstanceIndex }