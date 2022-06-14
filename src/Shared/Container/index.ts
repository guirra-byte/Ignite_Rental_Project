import { container } from "tsyringe";

import { SpecificationRepository } from "../../modules/cars/repositories/implementations/SpecificationRepository";
import { ISpecificationsRepository } from "../../modules/cars/repositories/ISpecificationRepository";

import { CategoriesRepository } from "../../modules/cars/repositories/implementations/CategoriesRepository";
import { ICategoriesRepository } from '../../modules/cars/repositories/ICategoriesRepository';

import { UserRepository } from '@modules/accounts/repositories/implementations/UserRepository';
import { IUserRepository } from '@modules/accounts/repositories/IUserRepository';

container
  .registerSingleton<ISpecificationsRepository>(

    "SpecificationRepository",
    SpecificationRepository

  );

container
  .registerSingleton<ICategoriesRepository>(

    "CategoriesRepository",
    CategoriesRepository
  );

container
  .registerSingleton<IUserRepository>(

    "UserRepository",
    UserRepository
  );
