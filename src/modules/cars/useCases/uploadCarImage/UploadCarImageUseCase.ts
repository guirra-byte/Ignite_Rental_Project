import { IUploadCarImagesRepository } from '../../repositories/IUploadCarImagesRepository';
import { ICarRepository } from '../../repositories/ICarRepository';
import { AppError } from '../../../../Shared/infra/http/Errors/AppError';
import { Car } from '../../model/Car';

interface IRequest {

  car_id: string
  images_name: string[]
}

export class UploadCarImagesUseCase {

  constructor(private uploadCarImagesRepository: IUploadCarImagesRepository,
    private carRepository: ICarRepository) { }

  async execute({ car_id, images_name }: IRequest): Promise<void> {

    const verifyCarExists = await this
      .carRepository
      .findById(car_id);

    console.log(verifyCarExists);

    if (!verifyCarExists) {

      throw new AppError("Car does exists");
    }

    images_name
      .map(async (image) => {

        await this
          .uploadCarImagesRepository
          .create(car_id, image);
      });
  }
}