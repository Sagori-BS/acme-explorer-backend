export const connection = {
  startSession: jest.fn().mockReturnValue({
    startTransaction: jest.fn(),
    endSession: jest.fn(),
    abortTransaction: jest.fn(),
    commitTransaction: jest.fn(),
  }),
};
