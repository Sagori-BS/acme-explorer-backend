import { InvalidEventPatternError } from '@shared/errors/microservices/invalid-event-pattern.error';
import { MaximumEventPatternDepthError } from '@shared/errors/microservices/maximum-event-pattern-depth.error';

export const normalizeEventPattern = (eventPattern: string): string => {
  if (!eventPattern) {
    throw new Error();
  }

  const normalizedPattern = buildNormalizedPattern(eventPattern);

  return normalizedPattern;
};

const buildNormalizedPattern = (_parsedPattern, maxDepth = 2): string => {
  if (maxDepth === 0) {
    throw new MaximumEventPatternDepthError();
  }

  const parsedPattern = JSON.parse(_parsedPattern);

  if (typeof parsedPattern === 'string') {
    return parsedPattern;
  }

  const splittedPattern: string[] = [];

  const patternKeys = Object.keys(parsedPattern);

  for (const key of patternKeys) {
    if (typeof parsedPattern[key] === 'object') {
      const normalizedSubPattern = buildNormalizedPattern(
        JSON.stringify(parsedPattern[key]),
        maxDepth - 1,
      );

      splittedPattern.push(`${key}-${normalizedSubPattern}`);
    } else {
      if (!isValidPatternValue(parsedPattern[key])) {
        throw new InvalidEventPatternError();
      }
      const patternPiece = `${key}-${parsedPattern[key]}`;
      splittedPattern.push(patternPiece);
    }
  }

  const normalizedPattern = splittedPattern.join('-');

  return normalizedPattern;
};

const isValidPatternValue = (value: any) => {
  return typeof value === 'string' || typeof value === 'number';
};
