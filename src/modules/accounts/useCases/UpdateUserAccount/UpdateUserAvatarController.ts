import { Request, Response } from 'express';
import { UpdateUserAvatarUseCase } from './UpdateUserAvatarUseCase';

export class UpdateUserAvatarController {

  constructor(private updateUserAvatarUseCase: UpdateUserAvatarUseCase) { }
  
  async handle(request: Request, response: Response): Promise<Response> {

    const { id } = request.user;
    const user_id = id;

    const avatarFile = request.file.filename;

    const user = await this
      .updateUserAvatarUseCase
      .execute({ user_id, avatarFile });

    return response
      .status(201)
      .send();
  }
}