import { Schema } from 'mongoose';

export const mongooseUniqueArray = (schema) => {
  schema.options.saveErrorIfNotFound = true;

  const paths = schema.paths;
  const arrayKeys = Object.keys(paths);

  const uniqueDocumentArrayPaths = {};
  arrayKeys
    .filter(function (path) {
      return paths[path].$isMongooseDocumentArray;
    })
    .forEach(function (path) {
      const arrSchema = paths[path].schema;
      const arrPaths = Object.keys(arrSchema.paths);
      arrPaths.forEach(function (_path) {
        if (arrSchema.paths[_path].options.unique) {
          uniqueDocumentArrayPaths[path] = uniqueDocumentArrayPaths[path] || [];
          uniqueDocumentArrayPaths[path].push(_path);

          schema.path(path).validate({
            validator: function () {
              // handle private API changes for mongoose >= 5.5.14 Automattic/mongoose#7870
              const arr = (this.$__getValue || this.getValue).call(
                this,
                path + '.' + _path
              );
              const dup = hasDuplicates(arr);
              if (dup) {
                return false;
              }
              return true;
            },
            message: 'Duplicate values in array ' + _path
          });
        }
      });
    });

  const uniquePrimitiveArrayPaths = {};
  arrayKeys.forEach(function (path) {
    if (
      paths[path] instanceof Schema.Types.Array &&
      !paths[path].$isMongooseDocumentArray &&
      paths[path].caster.options.unique
    ) {
      uniquePrimitiveArrayPaths[path] = true;

      schema.path(path).validate({
        validator: function (arr) {
          const dup = hasDuplicates(arr);
          if (dup) {
            return false;
          }
          return true;
        },
        message: 'Duplicate values in array ' + path
      });
    }
  });

  schema.pre('save', function (next) {
    let numDocArrayPaths;
    let uniqueDocArrPaths;

    if (this.isNew) {
      // New doc, already verified existing arrays have no dups
      return next();
    }

    const dirty = this.$__dirty();
    const len = dirty.length;

    for (let i = 0; i < len; ++i) {
      const dirt = dirty[i];
      if (
        !uniquePrimitiveArrayPaths[dirt.path] &&
        !uniqueDocumentArrayPaths[dirt.path]
      ) {
        continue;
      }
      if (!has$push(dirt) || dirt.value.$atomics().$push.$each == null) {
        continue;
      }

      if (uniquePrimitiveArrayPaths[dirt.path]) {
        this.$where = this.$where || {};
        this.$where[dirt.path] = { $nin: dirt.value.$atomics().$push.$each };
      } else {
        this.$where = this.$where || {};
        uniqueDocArrPaths = uniqueDocumentArrayPaths[dirt.path];
        numDocArrayPaths = uniqueDocArrPaths.length;
        for (let j = 0; j < numDocArrayPaths; ++j) {
          this.$where[dirt.path + '.' + uniqueDocArrPaths[j]] = {
            $nin: dirt.value.map(function (subdoc) {
              return subdoc.get(uniqueDocArrPaths[j]);
            })
          };
        }
      }
    }

    this.$__dirty().forEach((dirt) => {
      if (has$push(dirt) && dirt.value.$atomics().$push.$each != null) {
        this.$where = this.$where || {};
        if (dirt.schema.$isMongooseDocumentArray) {
          this.$where[dirt.path + '._id'] = {
            $nin: dirt.value.$atomics().$push.$each.map(function (doc) {
              return doc._id;
            })
          };
        } else {
          this.$where[dirt.path] = { $nin: dirt.value.$atomics().$push.$each };
        }
      }
    });

    next();
  });
};

function has$push(dirt) {
  return (
    dirt.value != null &&
    dirt.value.$atomics &&
    dirt.value.$atomics() != null &&
    '$push' in dirt.value.$atomics()
  );
}

function hasDuplicates(arr) {
  if (!arr) {
    return false;
  }
  const len = arr.length;
  const map = {};
  const mapId = {};
  let el;

  for (let i = 0; i < len; ++i) {
    el = arr[i];

    if (map[el.toString()] || (el.id && mapId[el.id])) {
      return true;
    }
    map[el.toString()] = true;
    if (el.id) mapId[el.id] = true;
  }
  return false;
}
