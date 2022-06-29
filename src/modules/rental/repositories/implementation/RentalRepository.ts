import { IRentalRepository, IRequest } from "../IRentalRepository";
import { prisma } from "../../../../Shared/infra/Prisma/Client/Client";
import { Rental } from "@modules/rental/model/rental";

export class RentalRepository implements IRentalRepository {

  private repository: typeof prisma.rentals;

  constructor() {

    this.repository = prisma.rentals;
  }

  private static INSTANCE: RentalRepository;

  static getInstance(): RentalRepository {

    if (!RentalRepository.INSTANCE) {

      RentalRepository
        .INSTANCE = new RentalRepository();
    }

    return RentalRepository.INSTANCE;
  }

  async createRental({ user_id, car_id, expect_return_date }: IRequest): Promise<void> {

    await this
      .repository
      .create({
        data: {
          user_id,
          car_id,
          expect_return_date
        }
      });
  }

  async findOpenRentalByCar(car_id: string): Promise<Rental> {

    const findOpenRentalByCar = await this
      .repository
      .findUnique({
        where: { car_id: car_id },
        include: { User: true, Car: true }
      });

    if (findOpenRentalByCar &&
      findOpenRentalByCar.end_date === undefined) {

      const carAvailable = findOpenRentalByCar;
      return carAvailable;
    }

    return undefined;
  }

  async findOpenRentalByUser(user_id: string): Promise<Rental> {

    const findOpenRentalByUser = await this
      .repository
      .findUnique({
        where: { user_id: user_id },
        include: { Car: true, User: true }
      });

    if (findOpenRentalByUser &&
      findOpenRentalByUser.end_date === undefined) {

      const userAvailable = findOpenRentalByUser;
      return userAvailable;
    }

    return undefined;
  }
}