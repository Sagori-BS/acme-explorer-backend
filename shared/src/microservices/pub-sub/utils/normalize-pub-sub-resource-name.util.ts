import { InvalidPubSubResourceNameError } from '@shared/errors/pub-sub/invalid-pub-sub-resource-name.error';

export const normalizePubSubResourceName = (
  topicName: string,
  seeds: string[] = [],
) => {
  if (!topicName) {
    throw new InvalidPubSubResourceNameError(topicName);
  }

  const normalizedPattern = _getNormalizedPubSubResourceName(topicName, seeds);

  return normalizedPattern;
};

const _getNormalizedPubSubResourceName = (
  topicName: string,
  seeds: string[],
): string => {
  const parsedPattern = JSON.parse(topicName);

  if (typeof parsedPattern === 'string') {
    return _buildNormalizedPubSubResourceName(parsedPattern, seeds);
  }

  const { type } = parsedPattern;

  if (!type || typeof type !== 'string') {
    throw new InvalidPubSubResourceNameError(topicName);
  }

  return _buildNormalizedPubSubResourceName(type, seeds);
};

const _buildNormalizedPubSubResourceName = (
  topicName: string,
  seeds: string[],
) => {
  const topicSource = [...seeds, ...topicName.split(' ')];

  return topicSource.join('-');
};
