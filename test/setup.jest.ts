import { mongooseModuleTesting } from "../shared/src/test/db-module";

beforeAll(async () => {
  await mongooseModuleTesting.init();
});

afterEach(() => {
  jest.clearAllMocks();
});

afterAll(async () => {
  await mongooseModuleTesting.closeConnection();
});
