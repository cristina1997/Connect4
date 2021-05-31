import { Token } from './token.model';

describe('Token', () => {
  it('should create an instance', () => {
    expect(new Token(5, 5)).toBeTruthy();
  });
});
