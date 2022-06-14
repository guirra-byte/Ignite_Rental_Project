import { Router } from 'express';
import multer from 'multer';
import "../Shared/Container/index";

import { ListCategoryController } from '@modules/cars/useCases/listCategory/ListCategoryController';

import { FindOneCategoryController } from '@modules/cars/useCases/findOneCategory/FindOneCategoryController';

import { CreateCategoryController } from '@modules/cars/useCases/createCategory/CreateCategoryController';

import { CreateCategoriesImportImagesController } from '@modules/cars/useCases/createCategoriesImportImages/createCategoriesImportImagesController';

import { VerifyCategoriesAlreadyExistsMiddlewareController } from '../Middleware/indexController';

import { VerifyUserAuthToken } from '../Middleware/Token/Auth';

const categoriesRoutes = Router();

const upload = multer({
  dest: './tmp'
});

const verifyCategoryMiddleware = new VerifyCategoriesAlreadyExistsMiddlewareController();

const createCategoryController = new CreateCategoryController();
categoriesRoutes.post('/', VerifyUserAuthToken, verifyCategoryMiddleware.handle, createCategoryController.handle);


const listAllCategoryController = new ListCategoryController();

categoriesRoutes.get('/', listAllCategoryController.handle);


const createImportCategoryController = new CreateCategoriesImportImagesController();

categoriesRoutes.post('/import', upload.single('file'), verifyCategoryMiddleware.handle, createImportCategoryController.handle);


const findOneCategoryController = new FindOneCategoryController();

categoriesRoutes.get('/:name', (request, response) => {

  return findOneCategoryController.handle(request, response)
}
);


export { categoriesRoutes }
