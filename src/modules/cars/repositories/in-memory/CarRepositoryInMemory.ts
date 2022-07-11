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

  async findAvailable(brand?: string, category_id?: string, name?: string): Promise<Car[]> {

    const findCars = await this
      .repository
      .filter(async (car) => { return car.available === true })
      .filter(async (car) =>
        (brand && car.brand === brand)
        || (category_id && car.category_id === category_id)
        || (name && car.name === name));

    return findCars;
  }

  async findById(id: string): Promise<Car> {

    const findCarById = await this
      .repository
      .find((car) => car.id === id);

    return findCarById;
  }

  async replaceAvailable(car_id: string, available: boolean): Promise<Car> {

    const requireAvailable: boolean = available;

    const findCarAndReplace = await this
      .repository
      .find(async (car) => {
        car.id === car_id
      });

    findCarAndReplace.available = requireAvailable;

    return findCarAndReplace;
  }
}