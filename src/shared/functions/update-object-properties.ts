import _ from 'lodash';

export const updateObjectProperties = (originalObject, updateData) => {
  _(updateData).forEach((value, key) => {
    if (_.isObject(value)) {
      const newValue = updateObjectProperties(originalObject[key], value);
      originalObject[key] = newValue;
    } else originalObject[key] = value;
  });

  return originalObject;
};
