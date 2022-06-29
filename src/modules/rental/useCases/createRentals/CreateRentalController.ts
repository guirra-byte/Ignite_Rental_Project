import { DateProvider } from "../../../../Shared/infra/Providers/DateProvider/implementations/DateProvider";
import { CreateRentalUseCase } from "./CreateRentalUseCase";
import { Request, Response } from 'express';

export class CreateRentalController {

  constructor(private createRentalUseCase: CreateRentalUseCase) { }

  async handle(request: Request, response: Response): Promise<Response> {

    const { car_id, expect_return_date } = request.body;
    const user = request.user;

    try {

      const createRental = await this
        .createRentalUseCase
        .execute({ car_id, user_id: user.id, expect_return_date });

      return response
        .status(201)
        .send();
    }

    catch (exception) {

      return response
        .status(400)
        .json({ message: exception });
    }
  }
}