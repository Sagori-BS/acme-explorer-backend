import * as joi from 'joi';

const hexStringRegex = /^#[A-F0-9]{6}$/;

export const validateHexString = (value: string): boolean => {
  if (!value) {
    throw new Error('field expected a defined value');
  }

  if (!hexStringRegex.test(value)) {
    throw new Error(
      `expected an hex string but received invalid value ${value}`
    );
  }

  return true;
};

export const validateHexStringWithJoi = joi.string().regex(hexStringRegex, {
  name: 'hex string'
});
