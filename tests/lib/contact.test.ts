import { beforeEach, describe, expect, it, vi } from 'vitest';
import { getHomeHref, getLegalHref, LEGAL_PAGE_TITLES } from '@/lib/contact';

describe('contact helpers', () => {
  beforeEach(() => {
    vi.stubEnv('BASE_URL', '/app/');
  });

  it('builds legal page hrefs based on BASE_URL', () => {
    expect(getLegalHref('agb')).toBe('/app/?page=agb');
    expect(getLegalHref('datenschutz')).toBe('/app/?page=datenschutz');
    expect(getLegalHref('impressum')).toBe('/app/?page=impressum');
  });

  it('returns the correct home href and appends anchor hashes', () => {
    expect(getHomeHref()).toBe('/app/');
    expect(getHomeHref('#about')).toBe('/app/#about');
  });

  it('exposes all legal page titles', () => {
    expect(LEGAL_PAGE_TITLES.agb).toBe('AGB');
    expect(LEGAL_PAGE_TITLES.datenschutz).toMatch(/Datenschutzerklärung/);
    expect(LEGAL_PAGE_TITLES.impressum).toBe('Impressum');
  });
});
