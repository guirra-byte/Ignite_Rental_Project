import { response, Router } from 'express';

import multer from 'multer';
import Upload from "../../../../Config/Upload/Upload";

import { VerifyUserAuthToken as ensureAuthToken } from '../Middleware/Token/Auth';

import { CreateUserInstanceIndex } from '../../../../modules/accounts/useCases/CreateUser/index';
import { UpdateUserAvatarInstanceIndex } from '../../../../modules/accounts/useCases/UpdateUserAccount/index';
import { FindOneUserInstanceIndex } from '../../../../modules/accounts/useCases/FindOneUser/index';

const userRoutes = Router();

const uploadAvatar = multer(Upload.upload("./tmp/avatar"));

userRoutes.post('/', (request, response) => {

  return CreateUserInstanceIndex(request, response);
});

userRoutes.get('/:email', (request, response) => {

  return FindOneUserInstanceIndex(request, response);
})

userRoutes.patch('/changeAvatar', ensureAuthToken, uploadAvatar
  .single("avatar"), (request, response) => {

    return UpdateUserAvatarInstanceIndex(request, response);
  });

export { userRoutes };