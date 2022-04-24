import * as mongoose from 'mongoose';
import { EntityNotFoundError } from '@common/common/errors/common/entity-not-found.error';
import { _validateId } from '@common/common/validations/common/identification/mongo-id/id.validator';
import { _validateIds } from '@common/common/validations/common/identification/mongo-ids/ids.validator';

export function validateRefsPlugin(schema: mongoose.Schema) {
  schema.pre('update', function(next) {
    const options = this.getOptions();

    this.setOptions({
      ...JSON.parse(JSON.stringify(options)),
      runValidators: true
    });

    next();
  });

  schema.pre('findOneAndUpdate', function(next) {
    const options = this.getOptions();

    this.setOptions({
      ...JSON.parse(JSON.stringify(options)),
      runValidators: true
    });

    next();
  });

  schema.pre('validate', function(next) {
    const connection = getActualConnection();

    schema.eachPath((path: string, schemaType: mongoose.SchemaType) => {
      if (schemaType.options.ref) {
        schema.path(path).validate({
          validator: async function(value) {
            let ids: string[];

            const isArray =
              schemaType.instance === 'Array' ||
              schemaType['$isMongooseArray'] === true;

            if (
              (value === null || value === undefined) &&
              !schemaType.options.required &&
              !isArray
            ) {
              return true;
            } else if (
              schemaType.options.type === mongoose.Schema.Types.ObjectId &&
              !_validateId(value)
            ) {
              return false;
            } else if (isArray && !_validateIds(value)) {
              return false;
            }

            if (isArray) {
              if (value.length === 0) {
                return true;
              }
              ids = value;
            } else {
              ids = [value];
            }

            const refModel = connection.model(
              schemaType.options.ref,
              schemaType.schema
            );

            const result = await refModel
              .countDocuments({ _id: { $in: ids } })
              .exec();

            if (result < value.length && isArray) {
              throw new EntityNotFoundError(path);
            } else if (result < 1) {
              throw new EntityNotFoundError(path);
            }

            return true;
          }
        });
      }
    });

    next();
  });
}

// Why do we do this? Mongoose has a default empty connection, and we want the actual connection
// We can assume that it will be the mongoose.connections[1], but better safe than sorry
function getActualConnection(): mongoose.Connection {
  const connections = mongoose.connections;
  if (connections.length === 0) {
    throw new Error('no mongoose connections');
  }

  for (let i = 0; i < connections.length; i++) {
    if (connections[i].host) {
      return connections[i];
    }
  }

  throw new Error('no host in connections');
}
