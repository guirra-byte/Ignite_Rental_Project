import { IUserRepository } from "@modules/accounts/repositories/IUserRepository";
import { deleteFile } from '../../../../Utils/File';

interface IUserUploadProps {

  user_id: string;
  avatarFile: string;
}

export class UpdateUserAvatarUseCase {

  constructor(private userRepository: IUserRepository) { }

  async execute({ user_id, avatarFile }: IUserUploadProps): Promise<void> {

    const user = await this
      .userRepository
      .findById(user_id);

    if (user.avatar) {

      await deleteFile(`./tmp/avatar/${user.avatar}`);

    }
    user.avatar = avatarFile;

    await this
      .userRepository
      .create(user);

  }
}