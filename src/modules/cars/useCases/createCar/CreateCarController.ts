import { Request, Response } from 'express';
import { CreateCarUseCase } from './CreateCarUseCase';

export class CreateCarController {

  constructor(private createCarUseCase: CreateCarUseCase) { }

  async handle(request: Request, response: Response) {

    const { name, description, daily_rate, available, license_plate, fine_amount, brand, category_id } = request.body;

    try {

      const props = { name, description, daily_rate, available, license_plate, fine_amount, brand, category_id };

      await this
        .createCarUseCase
        .execute(props);

      return response
        .status(201)
        .send();
    }

    catch (exception) {

      return response
        .status(400)
        .json({ message: { exception } });
    }
  }
}