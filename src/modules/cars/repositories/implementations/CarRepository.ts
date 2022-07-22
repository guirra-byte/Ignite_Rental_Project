import { ICarRepository, ICarRequestProps } from "../ICarRepository";
import { prisma } from "../../../../Shared/infra/Prisma/Client/Client";
import { Car } from "../../model/Car";

export class CarRepository implements ICarRepository {

  private repository: typeof prisma.car;

  constructor() {

    this.repository = prisma.car;
  }

  private static INSTANCE: CarRepository;
  static getInstance(): CarRepository {

    if (!CarRepository.INSTANCE) {

      CarRepository.INSTANCE = new CarRepository();
    }

    return CarRepository.INSTANCE;
  }

  async createCar(props: ICarRequestProps): Promise<void> {

    const { name, description, daily_rate,
      available, license_plate, fine_amount, brand, category_id } = props;

    await this
      .repository
      .create({
        data: {
          name,
          description,
          daily_rate,
          available,
          license_plate,
          fine_amount,
          brand,
          fk_category_id: { connect: { id: category_id } }
        }
      });
  }

  async findOneCar(name: string): Promise<Car> {

    const findOneCar = await this
      .repository
      .findUnique({ where: { name: name } });

    return findOneCar;
  }

  async findAllCars(): Promise<Car[]> {

    const findAllCars = await this
      .repository
      .findMany();

    return findAllCars;
  }

  async findByLicensePlate(license_plate: string): Promise<Car> {

    const findCarByLicensePlate = await this
      .repository
      .findUnique({ where: { license_plate: license_plate } });

    return findCarByLicensePlate;
  }

  async findAvailable(): Promise<Car[]> {

    const findAllCarsAvailable = await this
      .repository
      .findMany({ where: { available: true } });

    return findAllCarsAvailable;

  }

  async findById(id: string): Promise<Car> {

    const findCarById = await this
      .repository
      .findUnique({
        where: { id: id }
      });

    return findCarById;
  }

  async replaceAvailable(car_id: string, available: boolean): Promise<Car> {

    const requireAvailable: boolean = available;

    const replaceCarInAvailable = await this
      .repository
      .update({
        where: { id: car_id },
        data: { available: requireAvailable }
      });

    return replaceCarInAvailable;
  }
}