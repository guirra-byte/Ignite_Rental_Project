import { Router } from 'express';
import multer from 'multer';
import Upload from '../../../../Config/Upload/Upload';

// ---- Importação dos Middlewares ---- 
import { ensureAdmin } from '../Middleware/VerifyUserIsAdmin';
import { VerifyUserAuthToken as ensureAuthToken } from '../Middleware/Token/Auth';
import { VerifyCarLicensePlateAlreadyExists as verifyCarLicensePlateAlreadyExists } from '../Middleware/VerifyCarLicensePlate';
// ---- ** ----

// ---- Importação dos Controllers ----
import { CreateCarInstanceIndex } from '../../../../modules/cars/useCases/createCar/index';
import { FindOneCarInstanceIndex } from '../../../../modules/cars/useCases/findOneCar/index';
import { FindAllCarsInstanceIndex } from '../../../../modules/cars/useCases/findAllCars/index';
import { UploadCarImagesInstanceIndex } from '../../../../modules/cars/useCases/uploadCarImage/index';
// ---- ** ----

// ---- Instanciação do Router ----
const carRoutes = Router();
// ---- ** ----

/// ---- Instanciação do Multer ----
const uploadCarImages = multer(Upload
  .upload("./tmp/cars"));
// ---- ** ----

carRoutes.post('/', ensureAuthToken, ensureAdmin,
  verifyCarLicensePlateAlreadyExists, (request, response) => {

    return CreateCarInstanceIndex(request, response);
  });

carRoutes.get('/', (request, response) => {

  return FindOneCarInstanceIndex(request, response);
});

carRoutes.get('/allCars', (request, response) => {

  return FindAllCarsInstanceIndex(request, response);
})

carRoutes.post('/uploadCarImages/:car_id', ensureAuthToken, ensureAdmin,
  uploadCarImages.array("images_name"), (request, response) => {

    return UploadCarImagesInstanceIndex(request, response);
  })

export { carRoutes }