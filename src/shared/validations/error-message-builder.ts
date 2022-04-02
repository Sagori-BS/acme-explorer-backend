import { IErrorMessageBuilderProps } from '@common/common/data/interfaces/error-message-builder.interface';

export const errorMessageBuilder = (props: IErrorMessageBuilderProps): string =>
  `Invalid value ${props.value} at field ${props.path}`;
