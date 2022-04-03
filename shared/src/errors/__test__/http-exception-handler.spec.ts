import { EntityNotFoundError } from '../common/entity-not-found.error';
import { InternalServerError } from '../common/internal-server.error';
import { HttpExceptionHandler } from '../http-exception-handler';

describe('HttpExceptionHandler', () => {
  const json = jest.fn();
  const status = jest.fn().mockReturnValue({ json });

  const host: any = {
    switchToHttp: () => ({
      getResponse: () => ({
        status,
      }),
    }),
  };

  let httpExceptionHandler: HttpExceptionHandler;

  beforeAll(() => {
    httpExceptionHandler = new HttpExceptionHandler();
  });

  it('should send a response with the desired error format', () => {
    //Arrange
    const error = new InternalServerError();

    //Act
    httpExceptionHandler.handleException(error, host);

    //Assert
    const result = json.mock.calls[0][0];

    expect(result).toHaveProperty('code');
    expect(result).toHaveProperty('errors');
    expect(result).toHaveProperty('message');
  });

  it('should send a response using the provided exception information, if the provided exception is instance of BaseError', () => {
    //Arrange
    const error = new EntityNotFoundError();

    //Act
    httpExceptionHandler.handleException(error, host);

    //Assert
    const result = json.mock.calls[0][0];

    expect(result).toEqual({ ...error });
  });

  it('should send a response using the InternalServerError information, if the provided exception is not instance of BaseError', () => {
    //Arrange
    const error = new Error();
    const expectedError = new InternalServerError();

    //Act
    httpExceptionHandler.handleException(error, host);

    //Assert
    const result = json.mock.calls[0][0];

    expect(result).toEqual({ ...expectedError });
  });

  it.todo('should send a response using the provided error code');
});
