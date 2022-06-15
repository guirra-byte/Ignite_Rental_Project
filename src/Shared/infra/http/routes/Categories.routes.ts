import { Router } from 'express';
import multer from 'multer';


// ---- Middlewares ----
import { verifyCategoryAlreadyExists } from '../Middleware/indexController';
import { VerifyUserAuthToken } from '../Middleware/Token/Auth';
// ---- ** ----

// ---- Instanciação dos UseCases ----
import { CreateCategoryInstanceIndex } from '@modules/cars/useCases/createCategory';
import { FindOneCategoryInstanceIndex } from '@modules/cars/useCases/findOneCategory';
import { ListCategoryInstanceIndex } from '@modules/cars/useCases/listCategory';
import { CreateCategoriesImportImagesController }
  from '@modules/cars/useCases/createCategoriesImportImages/createCategoriesImportImagesController';
// ---- ** ----

const categoriesRoutes = Router();

const upload = multer({
  dest: './tmp'
});

categoriesRoutes.post('/', VerifyUserAuthToken, verifyCategoryAlreadyExists, (request, response) => {

  return CreateCategoryInstanceIndex(request, response);
});

categoriesRoutes.get('/', (request, response) => {

  return ListCategoryInstanceIndex(request, response);
});

// categoriesRoutes.post('/import', upload.single('file'), verifyCategoryAlreadyExists, (request, response) => {

//   return
// });

categoriesRoutes.get('/:name', (request, response) => {

  return FindOneCategoryInstanceIndex(request, response);
}
);


export { categoriesRoutes }
