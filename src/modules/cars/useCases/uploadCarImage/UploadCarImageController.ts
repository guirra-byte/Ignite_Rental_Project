import { Request, Response } from 'express';
import { UploadCarImagesUseCase } from './UploadCarImageUseCase';

export interface IFiles {

  filename: string
}

export class UploadCarImagesController {

  constructor(private uploadCarImagesUseCase: UploadCarImagesUseCase) { }

  async handle(request: Request, response: Response): Promise<Response> {

    const { car_id } = request.params;
    const images_name = request.files as IFiles[];

    try {

      const filesName = images_name
        .map((file) => file.filename);

      const uploadCarImages = await this
        .uploadCarImagesUseCase
        .execute({ car_id, images_name: filesName });

      return response
        .status(201)
        .json({ uploadCarImages });
    }

    catch (exception) {

      return response
        .status(400)
        .json({ message: exception });
    }

  }
}