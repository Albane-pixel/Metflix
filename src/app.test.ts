import { describe, it, expect } from 'vitest';
import { APP_NAME } from './main';

describe('Metflix base check', () => {
  it('should define the product name', () => {
    expect(APP_NAME).toBe('Metflix');
  });
});
