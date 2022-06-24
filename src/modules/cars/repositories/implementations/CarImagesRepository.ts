import { CarImages } from '@modules/cars/model/CarImages';
import { prisma } from '../../../../Shared/infra/Prisma/Client/Client';
import { IUploadCarImagesRepository } from '../IUploadCarImagesRepository';

export class UploadCarImagesRepository implements IUploadCarImagesRepository {

  constructor(private repository: typeof prisma) { }

  private static INSTANCE: UploadCarImagesRepository;

  static getInstance(): UploadCarImagesRepository {

    if (!UploadCarImagesRepository.INSTANCE) {

      UploadCarImagesRepository.INSTANCE = new UploadCarImagesRepository(prisma);
    }

    return UploadCarImagesRepository.INSTANCE;
  }

  async create(car_id: string, image_name: string): Promise<CarImages> {

    const createCarImages = await this
      .repository
      .carImages
      .create({
        data: {
          image_name,
          car_id
        }
      });

    return createCarImages;
  }
}