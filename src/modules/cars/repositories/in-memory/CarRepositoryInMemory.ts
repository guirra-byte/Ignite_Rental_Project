import { ICarRepository, ICarRequestProps } from "../ICarRepository";
import { Car } from '../../model/Car';

export class CarRepositoryInMemory implements ICarRepository {

  private repository: Car[];

  constructor() {

    this.repository = [];
  }

  async createCar(props: ICarRequestProps): Promise<void> {

    const carProps = props;
    const newCar = new Car(carProps);

    await this
      .repository
      .push(newCar);

  }

  async findOneCar(name: string): Promise<Car> {

    const findOne = await this
      .repository
      .find((car) => name === car.name);

    return findOne;
  }

  async findAllCars(): Promise<Car[]> {

    const findAllCars = await this
      .repository;

    return findAllCars;
  }

  async findByLicensePlate(license_plate: string): Promise<Car> {

    const findCar = await this
      .repository
      .find((car) => license_plate === car.license_plate);

    return findCar;
  }
}