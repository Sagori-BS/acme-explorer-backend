import { CreateStageInput } from '../graphql/inputs/stages/create-stage.input';

export const calculatePriceFromStages = (
  stages: CreateStageInput[]
): number => {
  return stages.reduce((acc, stage) => acc + stage.price, 0);
};
