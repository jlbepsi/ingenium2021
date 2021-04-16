import { SizeReadablePipe } from './size-readable.pipe';

describe('SizeReadablePipe', () => {
  it('create an instance', () => {
    const pipe = new SizeReadablePipe();
    expect(pipe).toBeTruthy();
  });
});
