import { response, Router } from 'express';

import multer from 'multer';
import "../Shared/Container/index";

import { VerifyUserAuthToken } from '../Middleware/Token/Auth';
import Upload from "../../../../Config/Upload/Upload";

import { CreateUserController } from '@modules/accounts/useCases/CreateUser/CreateUserController';
import { UpdateUserAvatarController } from '@modules/accounts/useCases/UpdateUserAccount/UpdateUserAvatarController';

const userRoutes = Router();

const uploadAvatar = multer(Upload.upload("./tmp/avatar"));

const createUserController = new CreateUserController();

userRoutes.post('/', createUserController.handle);

const updateUserAvatarController = new UpdateUserAvatarController();

userRoutes.patch('/changeAvatar', VerifyUserAuthToken, uploadAvatar
  .single("avatar"), updateUserAvatarController.handle);

export { userRoutes };