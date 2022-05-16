import { InputType } from '@nestjs/graphql';
import { RemoveFavoriteTripInput } from './remove-favorite-trip.input';

@InputType()
export class AddFavoriteTripInput extends RemoveFavoriteTripInput {}
