// add file path to jest config

describe('tests can be right next to the component if we add the filepath to the config', () => {
  test('true is true', () => {
    expect(true).toBe(true);
  });
});

describe('this is to test circleCI', () => {
  test('false is false (is true)', () => {
    expect(false === false).toBe(true);
  });
});
