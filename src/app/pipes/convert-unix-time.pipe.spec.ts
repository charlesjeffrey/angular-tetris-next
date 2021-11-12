import { ConvertUnixTimePipe } from './convert-unix-time.pipe';

describe('ConvertUnixTimePipe', () => {
  it('create an instance', () => {
    const pipe = new ConvertUnixTimePipe();
    expect(pipe).toBeTruthy();
  });
});
