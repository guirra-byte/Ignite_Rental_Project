import { CarImages } from '../model/CarImages';

export interface IUploadCarImagesRepository {

  create(car_id: string, image_name: string): Promise<CarImages>
}