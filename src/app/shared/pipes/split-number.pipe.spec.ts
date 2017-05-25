import { SplitNumberPipe } from './split-number.pipe';

let pipe: SplitNumberPipe;

function test(num: string|number, output: string) {
  return () => {
    expect(pipe.transform(num)).toEqual(output);
  };
}

describe('SplitNumberPipe', () => {
  beforeEach(() => pipe = new SplitNumberPipe());

  it('should split numbers with "," 3 at a time', test(1234, '1,234'));
  it('should also split string of number', test('1234', '1,234'));
  it('should not split number less than 1000', test(42, '42'));
  it('should not have leading/trailing ","', test(123456, '123,456'));
  it('should not split number mixed with text', test('12a34b', '12a34b'));
});
