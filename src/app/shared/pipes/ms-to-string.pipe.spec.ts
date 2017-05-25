import { MSToStringPipe } from './ms-to-string.pipe';

let pipe: MSToStringPipe;

function test(
  time: {
    h?: number,
    m?: number,
    s?: number,
    ms?: number,
    showMS?: boolean,
  },
  output: string,
) {
  return () => {
    let ms = 0;
    if (time.h) {
      ms += time.h * 60 * 60 * 1000;
    }
    if (time.m) {
      ms += time.m * 60 * 1000;
    }
    if (time.s) {
      ms += time.s * 1000;
    }
    if (time.ms) {
      ms += time.ms;
    }

    expect(pipe.transform(ms, !!time.showMS)).toEqual(output);
  };
}

describe('MSToStringPipe', () => {
  beforeEach(() => pipe = new MSToStringPipe());

  it(
    'should show time in hh:mm:ss format by default',
    test({ h: 12, m: 24, s: 42 }, '12:24:42'),
  );

  it(
    'should show time in hh:mm:ss:mss format when showMS = true',
    test({ h: 12, m: 24, s: 42, ms: 360, showMS: true }, '12:24:42:360'),
  );

  it(
    'should skip hour if time is less than a hour',
    test({ m: 1, s: 42 }, '1:42'),
  );

  it(
    'should always show 3 digits for milliseconds',
    test({ ms: 0, showMS: true }, '0:00:000'),
  );

  it(
    'should show 0 minutes even when time is less than 1 minute',
    test({ s: 42 }, '0:42'),
  );

  it(
    'should always show 2 digits for seconds',
    test({ m: 1, s: 2 }, '1:02'),
  );

  it(
    'should always show 2 digits for minutes if time larger than 1 hour',
    test({ h: 1, m: 1, s: 1 }, '1:01:01'),
  );
});
