import 'reflect-metadata';
import "express-async-errors";
import "../Database";
import './Shared/Container/index';

import SwaggerUiOptions from 'swagger-ui-express';
import swaggerFile from '../../../swagger.json';

import { app } from 'app';
import { AppError } from './Errors/AppError';
import { Request, Response, NextFunction } from 'express';

import { categoriesRoutes } from './routes/Categories.routes';
import { specificationsRoutes } from './routes/Specifications.routes';
import { userRoutes } from './routes/User.routes';
import { authRoutes } from './routes/AuthUsers.routes';


app.use("/api-docs", SwaggerUiOptions.serve, SwaggerUiOptions.setup(swaggerFile));

app.use("/categories", categoriesRoutes);

app.use('/specifications', specificationsRoutes);

app.use('/user', userRoutes);

app.use(authRoutes);

app.use((err: Error, request: Request, response: Response, next: NextFunction) => {

  if (err instanceof AppError) {

    return response
      .status(err.statusCode)
      .json({ message: err.message });

  }

  return response
    .status(500)
    .json({ message: `Internal server error - ${err.message}` })
})

app
  .listen(1102, () => {

    console.log("O server já está rodando --- 🎃😎🤩");

  });