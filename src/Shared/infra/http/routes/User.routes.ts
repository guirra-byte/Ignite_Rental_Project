import { response, Router } from 'express';

import multer from 'multer';

import { VerifyUserAuthToken as ensureAuthToken } from '../Middleware/Token/Auth';
import Upload from "../../../../Config/Upload/Upload";

import { CreateUserInstanceIndex } from '../../../../modules/accounts/useCases/CreateUser/index';
import { UpdateUserAvatarController } from '../../../../modules/accounts/useCases/UpdateUserAccount/UpdateUserAvatarController';
import { FindOneUserInstanceIndex } from '../../../../modules/accounts/useCases/FindOneUser/index';

const userRoutes = Router();

const uploadAvatar = multer(Upload.upload("./tmp/avatar"));

userRoutes.post('/', (request, response) => {

  return CreateUserInstanceIndex(request, response);
});

userRoutes.get('/:email', (request, response) => {

  return FindOneUserInstanceIndex(request, response);
})

// const updateUserAvatarController = new UpdateUserAvatarController();

// userRoutes.patch('/changeAvatar', ensureAuthToken, uploadAvatar
//   .single("avatar"), updateUserAvatarController.handle);

export { userRoutes };