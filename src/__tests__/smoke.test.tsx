import { describe, it, expect } from 'vitest';

describe('smoke', () => {
  it('runs the vitest harness', () => {
    expect(1 + 1).toBe(2);
  });

  it('loads jest-dom matchers', () => {
    const el = document.createElement('div');
    el.textContent = 'Hello';
    document.body.appendChild(el);
    expect(el).toBeInTheDocument();
  });
});
