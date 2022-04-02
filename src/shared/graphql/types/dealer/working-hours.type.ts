import { Field, ObjectType } from '@nestjs/graphql';
import { IWorkingHours } from '../../interfaces/working-hours.interface';

@ObjectType()
export class WorkingHours implements IWorkingHours {
  @Field(_type => [String], { defaultValue: [] })
  monday: string[];

  @Field(_type => [String], { defaultValue: [] })
  tuesday: string[];

  @Field(_type => [String], { defaultValue: [] })
  wednesday: string[];

  @Field(_type => [String], { defaultValue: [] })
  thursday: string[];

  @Field(_type => [String], { defaultValue: [] })
  friday: string[];

  @Field(_type => [String], { defaultValue: [] })
  saturday: string[];

  @Field(_type => [String], { defaultValue: [] })
  sunday: string[];
}
