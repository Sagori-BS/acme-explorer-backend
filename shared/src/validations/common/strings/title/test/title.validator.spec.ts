import { _validateTitle } from "../title.validator";
import * as faker from "faker";

describe("ValidateTitle", () => {
  it("should return false given an empty string", () => {
    const res = _validateTitle("");

    expect(res).toBe(false);
  });

  it("should return false given null", () => {
    const res = _validateTitle(null);

    expect(res).toBe(false);
  });

  it("should return false given undefined", () => {
    const res = _validateTitle(undefined);

    expect(res).toBe(false);
  });

  it.each([[""], [faker.lorem.word(1)], [faker.lorem.paragraphs(500)]])(
    'should return false given an invalid string = "%s"',
    (value: string) => {
      const res = _validateTitle(value);

      expect(res).toBe(false);
    }
  );

  it.each([[faker.lorem.word(10)], [faker.lorem.words(20)]])(
    'should return true given a valid string = "%s"',
    (value: string) => {
      const res = _validateTitle(value);

      expect(res).toBe(true);
    }
  );
});
