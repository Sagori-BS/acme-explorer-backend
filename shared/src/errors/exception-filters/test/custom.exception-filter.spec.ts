import { loggerService } from '@shared/logger/mock/logger.service';
import { ArgumentsHost } from '@nestjs/common';
import { InternalServerError } from '../../common/internal-server.error';
import { CustomExceptionsFilter } from '../custom.exception-filter';

describe('CustomExceptionFilter', () => {
  const httpExeptionHandler = {
    handleException: jest.fn(),
  };

  const host: ArgumentsHost = {
    getArgByIndex: jest.fn(),
    getArgs: jest.fn(),
    getType: jest.fn(),
    switchToHttp: jest.fn(),
    switchToRpc: jest.fn(),
    switchToWs: jest.fn(),
  };

  let customExceptionsFilter: CustomExceptionsFilter;

  beforeAll(() => {
    customExceptionsFilter = new CustomExceptionsFilter(
      loggerService,
      httpExeptionHandler,
    );
  });

  it('should call the error method of the loggger', () => {
    // Arrange
    const error = new InternalServerError();
    (host.getType as jest.Mock).mockReturnValueOnce('http');

    //Act
    customExceptionsFilter.catch(error, host);

    //Assert
    expect(loggerService.error).toHaveBeenCalled();
  });

  it('should call the handleException method of the httpExceptionHandler, if the host type is http', () => {
    // Arrange
    const error = new InternalServerError();
    (host.getType as jest.Mock).mockReturnValueOnce('http');

    //Act
    customExceptionsFilter.catch(error, host);

    //Assert
    expect(httpExeptionHandler.handleException).toHaveBeenCalled();
  });

  it('should return the exception, if the host type is graphql', () => {
    // Arrange
    const error = new InternalServerError();
    (host.getType as jest.Mock).mockReturnValueOnce('graphql');

    //Act
    const result = customExceptionsFilter.catch(error, host);

    //Assert
    expect(result).toEqual(error);
  });
});
