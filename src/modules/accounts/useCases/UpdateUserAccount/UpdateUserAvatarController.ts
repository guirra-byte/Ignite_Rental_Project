import { Request, Response } from 'express';
import { container } from 'tsyringe';
import { UpdateUserAvatarUseCase } from './UpdateUserAvatarUseCase';

export class UpdateUserAvatarController {

  async handle(request: Request, response: Response): Promise<Response> {

    const { id } = request.user;
    const user_id = id;

    const avatarFile = request.file.filename;

    const updateAvatarFile = container
      .resolve(UpdateUserAvatarUseCase);

    const user = updateAvatarFile
      .execute({ user_id, avatarFile });

    return response
      .status(201)
      .send();
  }
}