import { _validateUrls } from '../urls.validator';

describe('UrlsValidator', () => {
  it('should return false if given null', () => {
    const res = _validateUrls(null);

    expect(res).toBe(false);
  });

  it('should return false if given undefined', () => {
    const res = _validateUrls(undefined);

    expect(res).toBe(false);
  });

  it.each([
    [['an invalid url', 'https://www.youtube.com/']],
    [['https://www.youtube.com/', 'another invalid url']],
    [
      'https://nestjs.com/',
      'https://live.mongodb.com/events/#/list',
      'https://docs.nats.io/nats-concepts/intro',
      'an invalid url'
    ]
  ])(
    'should return false if given an array with one or more invalid urls',
    (value: string[]) => {
      const res = _validateUrls(value);

      expect(res).toBe(false);
    }
  );

  it('should return true if given an empty array', () => {
    const res = _validateUrls([]);

    expect(res).toBe(true);
  });

  it.each([
    [['https://www.youtube.com/']],
    [
      [
        'https://nestjs.com/',
        'https://live.mongodb.com/events/#/list',
        'https://docs.nats.io/nats-concepts/intro'
      ]
    ]
  ])(
    'should return true if given an array of valid urls',
    (value: string[]) => {
      const res = _validateUrls(value);

      expect(res).toBe(true);
    }
  );
});
