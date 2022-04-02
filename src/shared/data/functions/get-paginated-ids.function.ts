import { IPaginationDto } from '../interfaces/pagination-dto.interface';

export const getPaginatedIds = (ids: string[], input?: IPaginationDto) => {
  if (!input) {
    return ids;
  }

  const length = ids.length;
  const { start = 0, limit = length } = input;
  const end = start + limit;

  return ids
    .sort()
    .slice(start, end)
    .map(id => id.toString());
};
