import { Module, forwardRef } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { InspectorCommissionModule } from '../inspector-commission/inspector-commission.module';
import { InspectorGoalModule } from '../inspector-goal/inspector-goal.module';
import { User, UserSchema } from './database/user.entity';
import { UserController } from './user.controller';
import { UserRepository } from './user.repository';
import { UserService } from './user.service';
import { UserResolver } from './user.resolver';

@Module({
  imports: [
    InspectorCommissionModule,
    forwardRef(() => InspectorGoalModule),
    MongooseModule.forFeature([
      {
        name: User.name,
        schema: UserSchema
      }
    ])
  ],
  controllers: [UserController],
  providers: [UserService, UserRepository, UserResolver],
  exports: [MongooseModule, UserService, UserRepository]
})
export class UserModule {}
