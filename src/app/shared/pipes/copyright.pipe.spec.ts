import { CopyrightPipe } from './copyright.pipe';

let pipe: CopyrightPipe;

function test(src: string, output: string) {
  return () => {
    expect(pipe.transform(src)).toEqual(output);
  };
}

describe('CopyrightPipe', () => {
  beforeEach(() => pipe = new CopyrightPipe());

  it('should replace "(c)" with "©"', test('(c)', '©'));
  it('should replace "(p)" with "℗"', test('(p)', '℗'));
  it('should not replace anything else', test('abc123', 'abc123'));
});
