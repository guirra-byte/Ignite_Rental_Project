import { CarRepository } from '../../repositories/implementations/CarRepository';
import { UploadCarImagesRepository } from '../../repositories/implementations/CarImagesRepository';

import { UploadCarImagesUseCase } from './UploadCarImageUseCase';
import { UploadCarImagesController } from './UploadCarImageController';

import { Request, Response } from 'express';

const UploadCarImagesInstanceIndex = async (request: Request, response: Response) => {

  const uploadCarImagesRepository = UploadCarImagesRepository.getInstance();
  const carRepository = CarRepository.getInstance();

  const uploadCarImagesUseCase = new UploadCarImagesUseCase(uploadCarImagesRepository, carRepository);

  const uploadCarImagesController = new UploadCarImagesController(uploadCarImagesUseCase);

  await uploadCarImagesController
    .handle(request, response);

  return uploadCarImagesController;
}

export { UploadCarImagesInstanceIndex }

