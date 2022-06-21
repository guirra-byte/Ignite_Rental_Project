import { Router } from 'express';
import multer from 'multer';


// ---- Middlewares ----
import { verifyCategoryAlreadyExists } from '../Middleware/indexController';
import { VerifyUserAuthToken as ensureAuthToken } from '../Middleware/Token/Auth';
import { ensureAdmin } from '../Middleware/VerifyUserIsAdmin';
// ---- ** ----

// ---- Instanciação dos UseCases ----
import { CreateCategoryInstanceIndex } from '../../../../modules/cars/useCases/createCategory/index';
import { FindOneCategoryInstanceIndex } from '../../../../modules/cars/useCases/findOneCategory/index';
import { ListCategoryInstanceIndex } from '../../../../modules/cars/useCases/listCategory/index';
// ---- ** ----

const categoriesRoutes = Router();

const upload = multer({
  dest: './tmp'
});

categoriesRoutes.post('/', ensureAuthToken, ensureAdmin, verifyCategoryAlreadyExists, (request, response) => {

  return CreateCategoryInstanceIndex(request, response);
});

categoriesRoutes.get('/', (request, response) => {

  return ListCategoryInstanceIndex(request, response);
});

categoriesRoutes.get('/:name', (request, response) => {

  return FindOneCategoryInstanceIndex(request, response);
}
);

// categoriesRoutes.post('/import', upload.single('file'), verifyCategoryAlreadyExists, (request, response) => {

//   return
// });



export { categoriesRoutes }
