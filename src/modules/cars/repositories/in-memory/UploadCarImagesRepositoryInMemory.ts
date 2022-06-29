import { IUploadCarImagesRepository } from '../IUploadCarImagesRepository';
import { CarImages } from '../../model/CarImages';

export class UploadCarImagesRepositoryInMemory implements IUploadCarImagesRepository {

  private repository: CarImages[];

  constructor() {

    this.repository = [];
  }

  async create(car_id: string, image_name: string): Promise<CarImages> {

    const carImages = new CarImages();

    Object
      .assign(carImages, {
        car_id,
        image_name
      });

    await this
      .repository
      .push(carImages);

    const uploadCarImages = this
      .repository
      .find((carImage) => carImage.car_id === car_id);

    return uploadCarImages;
  }
}
