import { Injectable } from '@nestjs/common';
import { UserRepository } from './user.repository';
import { Service } from '@common/common/data/classes/service.class';
import { IUserServiceType } from './interfaces/types/common-type.interface';
import { GetUserByEmailDto } from './dto/get-user-by-email.dto';
import { FilterInput } from '@common/common/graphql/inputs/graphql-filter.input';

@Injectable()
export class UserService extends Service<IUserServiceType> {
  constructor(private readonly userRepository: UserRepository) {
    super(userRepository);
  }

  public async verifyUserEmail(
    getUserByEmailDto: GetUserByEmailDto
  ): Promise<boolean> {
    const { email } = getUserByEmailDto;

    const filterInput: FilterInput = {
      where: {
        email
      },
      limit: 1
    };

    const [user] = await super.getEntities(filterInput);

    return !!user && user.email === email;
  }
}
