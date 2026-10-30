import { expect, test } from '@playwright/test';

test('waffle vitrini ve fiyat içermeyen menü', async ({ page }) => {
  await page.goto('/menu');
  await expect(page.locator('.product-card')).toHaveCount(11);
  await expect(page.locator('.product-card .illustrative-tag')).toHaveCount(11);
  await expect(page.getByRole('heading', { name: 'Klasik Waffle' })).toBeVisible();
  const text = await page.locator('body').innerText();
  expect(text).not.toMatch(/\b\d+[.,]?\d*\s*(?:TL|₺)\b/i);
  expect(text).not.toMatch(/franchise|bayilik|\bsepet\b/i);
  expect(await page.evaluate(() => document.documentElement.scrollWidth <= innerWidth)).toBe(true);
});

test('ürün için WhatsApp sipariş talebi doğru hazırlanır', async ({ page }) => {
  await page.goto('/menu');
  await page.getByRole('button', { name: 'ÜRÜNÜ İNCELE' }).first().click();
  await expect(page.getByRole('dialog')).toBeVisible();
  await page.getByRole('button', { name: 'Adedi artır' }).click();
  await page.getByPlaceholder('Varsa tercihinizi yazın').fill('Çilek olsun');
  const href = await page.getByRole('link', { name: /WHATSAPP'TAN SİPARİŞ TALEBİ/ }).getAttribute('href');
  expect(href).toContain('https://wa.me/905402560609?text=');
  const message = new URL(href!).searchParams.get('text');
  expect(message).toContain('Klasik Waffle');
  expect(message).toContain('Adet: 2');
  expect(message).toContain('Not: Çilek olsun');
  expect(message).not.toMatch(/\b\d+[.,]?\d*\s*(?:TL|₺)\b/i);
});

test('ana sayfa bölümleri kaydırıldıkça açılır', async ({ page }) => {
  await page.goto('/');
  const target = page.locator('.editorial-section .section-heading');
  await target.scrollIntoViewIfNeeded();
  await expect(target).toHaveAttribute('data-visible', 'true');
  await expect(page.locator('.hero-photo img').first()).toBeVisible();
});

test('mobil menüden iletişime gidilir', async ({ page, isMobile }) => {
  test.skip(!isMobile, 'Mobil navigasyon davranışı');
  await page.goto('/');
  await page.getByRole('button', { name: 'Menüyü aç' }).click();
  await expect(page.getByRole('navigation', { name: 'Ana menü' })).toHaveClass(/is-open/);
  await page.getByRole('navigation', { name: 'Ana menü' }).getByRole('link', { name: 'İletişim' }).click();
  await expect(page).toHaveURL(/\/iletisim$/);
  await expect(page.getByRole('heading', { name: 'İletişim.' })).toBeVisible();
});


test('galeride yalnız gerçek kaynak fotoğrafları bulunur', async ({ page }) => {
  await page.goto('/galeri');
  await expect(page.locator('.gallery-grid figure')).toHaveCount(6);
  await expect(page.locator('.illustrative-tag')).toHaveCount(0);
});
