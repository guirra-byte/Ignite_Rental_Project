import { app } from '../../../app';
import { Request, Response, NextFunction } from 'express';

import "express-async-errors";

import SwaggerUiOptions from 'swagger-ui-express';
import swaggerFile from '../../../swagger.json';
import { AppError } from './Errors/AppError';

import { categoriesRoutes } from './routes/Categories.routes';
import { specificationsRoutes } from './routes/Specifications.routes';
import { carRoutes } from './routes/Car.routes';
import { rentalRoutes } from './routes/Rental.routes';

import { userRoutes } from './routes/User.routes';
import { authRoutes } from './routes/AuthUsers.routes';

// ---- Car Routes ----
app.use('/car', carRoutes);
app.use('/categories', categoriesRoutes);
app.use('/specifications', specificationsRoutes);

// ---- Car Rental Routes ----
app.use(rentalRoutes);
// ---- ** ----
// ---- ** ----

// ---- User Routes ----
// app.use('/user', userRoutes);
app.use(authRoutes);
app.use(userRoutes);
// ---- ** ----

app.use('/api-docs', SwaggerUiOptions.serve, SwaggerUiOptions.setup(swaggerFile));

app.use((err: Error, request: Request, response: Response, next: NextFunction) => {

  if (err instanceof AppError) {

    return response
      .status(err.statusCode)
      .json({ message: err.message });

  }

  return response
    .status(500)
    .json({ message: `Internal Server Error - :${err.message}` });
})

app
  .listen(1102, () => {

    console.log("O Server já está rodando --- 🎃😎🤩");

  });