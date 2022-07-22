import { Router } from 'express';
import axios from 'axios';

import { AXIOS } from '../../../../Config/axios';

import { VerifyUserAuthToken as ensureUserAuthToken } from '../Middleware/Token/Auth';
import { EnsureUserEmailAlreadyExists } from '../Middleware/EnsureUserEmailAlreadyExists';
import { CreateRentalInstanceIndex } from '../../../../modules/rental/useCases/createRentals/index';

import { CreateDevolutionInstanceIndex } from '../../../../modules/rental/useCases/devolutions/index';

const rentalRoutes = Router();

const {
  INSTANCE_ID,
  INSTANCE_TOKEN,
  INSTANCE_API } = AXIOS;

rentalRoutes.post('/rental', ensureUserAuthToken, (request, response) => {

  return CreateRentalInstanceIndex(request, response);
});

rentalRoutes.post('/rentalDevolution', ensureUserAuthToken, async (request, response) => {

  const { phoneNumber, msg } = request.body;

  await CreateDevolutionInstanceIndex(request, response)
    .then(async () => {

      await axios
        .post(`${INSTANCE_API}`, {

          phone: phoneNumber,
          message: msg

        }).then((response) => {

          console
            .log(response);

        }).catch((exception) => {

          console
            .log(exception);
        });
    });

});

rentalRoutes.post('/rentalResponse', EnsureUserEmailAlreadyExists, async (request, response) => {

  const { phoneNumber, msg } = request.body;

  await axios
    .post(`${INSTANCE_API}`,
      {
        phone: phoneNumber,
        message: msg

      }).then((response) => {

        console.log(response);
        return response.data;

      }).catch((error) => {

        console.log(error);
      });

  return response
    .status(201)
    .json();
});


export { rentalRoutes }