import { MongoMemoryServer } from 'mongodb-memory-server';
import * as mongoose from 'mongoose';
import { validateRefsPlugin } from '../validate-refs-plugin';
import * as faker from 'faker';
import { validateIds } from '@common/common/validations/common/identification/mongo-ids/ids.validator';
import { validateIdNullable } from '@common/common/validations/common/identification/mongo-id/id.-nullable.validator';
import { validateId } from '@common/common/validations/common/identification/mongo-id/id.validator';

describe('validateRefsPlugin', () => {
  const hobbySchema = new mongoose.Schema({
    name: {
      required: true,
      type: String
    }
  }).plugin(validateRefsPlugin);

  const foodSchema = new mongoose.Schema({
    name: {
      required: true,
      type: String
    }
  }).plugin(validateRefsPlugin);

  const userSchema = new mongoose.Schema({
    name: {
      required: true,
      type: String
    },
    hobbies: {
      type: [mongoose.Schema.Types.ObjectId],
      ref: 'Hobby',
      required: true
    }
  }).plugin(validateRefsPlugin);

  const recipeSchema = new mongoose.Schema({
    name: {
      required: true,
      type: String
    },
    author: {
      required: true,
      validate: validateId,
      type: mongoose.Schema.Types.ObjectId,
      ref: 'User'
    }
  }).plugin(validateRefsPlugin);

  const planSchema = new mongoose.Schema({
    name: {
      required: true,
      type: String
    },
    hobbies: {
      type: [mongoose.Schema.Types.ObjectId],
      ref: 'Hobby',
      default: [],
      validate: validateIds
    },
    foods: {
      type: [mongoose.Schema.Types.ObjectId],
      ref: 'Food',
      default: [],
      validate: validateIds
    },
    author: {
      default: null,
      validate: validateIdNullable,
      type: mongoose.Schema.Types.ObjectId,
      ref: 'User'
    }
  }).plugin(validateRefsPlugin);

  const Hobby = mongoose.model('Hobby', hobbySchema);
  const User = mongoose.model('User', userSchema);
  const Recipe = mongoose.model('Recipe', recipeSchema);
  const Plan = mongoose.model('Plan', planSchema);
  const Food = mongoose.model('Food', foodSchema);

  const createHobbySetup = async (name = faker.lorem.word()) => {
    const hobby = new Hobby({
      name,
      _id: new mongoose.Types.ObjectId()
    });

    return await hobby.save();
  };

  const createFoodSetup = async (name = faker.lorem.word()) => {
    const food = new Food({
      name,
      _id: new mongoose.Types.ObjectId()
    });

    return await food.save();
  };

  const createUserSetup = async (hobbies = []) => {
    const user = new User({
      name: faker.name.firstName(),
      hobbies,
      _id: new mongoose.Types.ObjectId()
    });

    return await user.save();
  };

  beforeAll(async () => {
    const mongodb = await MongoMemoryServer.create();
    await mongoose.connect(mongodb.getUri());
  });

  afterEach(async () => {
    Hobby.deleteMany({});
    User.deleteMany({});
    Recipe.deleteMany({});
    Plan.deleteMany({});
  });

  it('should not throw error when all expected entities exist', async () => {
    //  Arrange
    const hobby = await createHobbySetup();

    const user = await createUserSetup([hobby._id]);

    const recipe = new Recipe({
      name: faker.name.title(),
      author: user._id
    });

    await recipe.save();
  });

  it('should throw error when hobby does not exist when creating a user', async () => {
    // Arrange
    const user = new User({
      name: faker.name.firstName(),
      hobbies: [new mongoose.Types.ObjectId()],
      _id: new mongoose.Types.ObjectId()
    });

    // Act
    const result = user.save();

    // Assert
    await expect(result).rejects.toThrowError(mongoose.Error.ValidationError);
  });

  it('should not throw error when user its not provided when creating a plan', async () => {
    const plan = new Plan({
      name: faker.name.firstName(),
      _id: new mongoose.Types.ObjectId()
    });

    await plan.save();
  });

  it(`should throw error when you send an array of hobbies but one of those doesn't exist when creating a plan`, async () => {
    // Arrange
    const hobbyOne = await createHobbySetup();
    const hobbyTwo = await createHobbySetup();

    // Act
    const plan = new Plan({
      name: faker.name.firstName(),
      hobbies: [hobbyOne._id, hobbyTwo._id, new mongoose.Types.ObjectId()],
      _id: new mongoose.Types.ObjectId()
    });

    const result = plan.save();

    // Assert
    await expect(result).rejects.toThrowError(mongoose.Error.ValidationError);
  });

  it(`should throw error when you send an array of hobbies and foods but one of each doesn't exist when creating a plan`, async () => {
    // Arrange
    const hobbyOne = await createHobbySetup();
    const hobbyTwo = await createHobbySetup();
    const foodOne = await createFoodSetup();
    const foodTwo = await createFoodSetup();

    // Act
    const plan = new Plan({
      name: faker.name.firstName(),
      hobbies: [hobbyOne._id, hobbyTwo._id, new mongoose.Types.ObjectId()],
      foods: [foodOne._id, foodTwo._id, new mongoose.Types.ObjectId()],
      _id: new mongoose.Types.ObjectId()
    });

    const result = plan.save();

    // Assert
    await expect(result).rejects.toThrowError(mongoose.Error.ValidationError);
  });

  it(`should not throw error when you send an array of hobbies and they all exist when creating a plan`, async () => {
    // Arrange
    const hobbyOne = await createHobbySetup();
    const hobbyTwo = await createHobbySetup();

    // Act
    const plan = new Plan({
      name: faker.name.firstName(),
      hobbies: [hobbyOne._id, hobbyTwo._id],
      _id: new mongoose.Types.ObjectId()
    });

    // Assert
    await plan.save();
  });

  it('should throw error when user does not exist when creating a recipe', async () => {
    // Arrange
    const recipe = new Recipe({
      name: faker.name.firstName(),
      author: new mongoose.Types.ObjectId(),
      _id: new mongoose.Types.ObjectId()
    });

    // Act
    const result = recipe.save();

    // Assert
    await expect(result).rejects.toThrowError(mongoose.Error.ValidationError);
  });

  it('should not throw error when updating a user', async () => {
    // Arrange
    const hobby = await createHobbySetup();

    const user = await createUserSetup([hobby._id]);

    const newHobby = await createHobbySetup();

    // Act
    await user.update({ _id: user._id }, { $set: { hobbies: [newHobby._id] } });
  });

  it('should throw error when updating a user if the hobby does not exist, using the update method', async () => {
    // Arrange
    const hobby = await createHobbySetup();

    const user = await createUserSetup([hobby._id]);

    // Act
    const updateResult = user.update({
      $set: { hobbies: [new mongoose.Types.ObjectId()] }
    });

    // Assert
    await expect(updateResult).rejects.toThrowError(
      mongoose.Error.ValidationError
    );
  });

  it('should throw error when updating a user if the hobby does not exist, using the findOneAndUpdate method', async () => {
    // Arrange
    const hobby = await createHobbySetup();

    const user = await createUserSetup([hobby._id]);

    const userModel = mongoose.model('User', userSchema);

    // Act
    const updateResult = userModel.findOneAndUpdate(
      {
        _id: user._id
      },
      {
        $set: { hobbies: [new mongoose.Types.ObjectId()] }
      }
    );

    // Assert
    await expect(updateResult).rejects.toThrowError(
      mongoose.Error.ValidationError
    );
  });
});
