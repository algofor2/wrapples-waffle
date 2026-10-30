import { expect, test } from '@playwright/test';
import { seedProducts } from '../src/lib/catalog';
import { buildOrderMessage } from '../src/lib/orders';

test('WhatsApp includes every chosen option and enforces group limits', async ({ page }) => {
  await page.goto('/menu');
  await page.getByRole('button', { name: 'ÜRÜNÜ İNCELE' }).first().click();
  const dialog = page.getByRole('dialog');
  await dialog.getByLabel('Sütlü çikolata', { exact: true }).check();
  await dialog.getByLabel('Beyaz çikolata', { exact: true }).check();
  await expect(dialog.getByLabel('Çikolata sosu', { exact: true })).toBeDisabled();
  for (const fruit of ['Muz', 'Çilek', 'Kivi']) await dialog.getByLabel(fruit, { exact: true }).check();
  await dialog.getByRole('button', { name: 'Adedi artır' }).click();
  await dialog.getByPlaceholder('Varsa tercihinizi yazın').fill('Az çikolata & ayrı paket, lütfen.');
  const link = new URL((await dialog.getByRole('link', { name: /WHATSAPP'TAN/ }).getAttribute('href'))!);
  expect(link.hostname).toBe('wa.me'); expect(link.pathname).toBe('/905402560609');
  const message = link.searchParams.get('text');
  expect(message).toContain('Adet: 2');
  expect(message).toContain('Çikolata tercihi: Sütlü çikolata, Beyaz çikolata');
  expect(message).toContain('Meyve tercihi: Muz, Çilek, Kivi');
  expect(message).toContain('Not: Az çikolata & ayrı paket, lütfen.');
  await page.keyboard.press('Escape');
  await expect(dialog).not.toBeVisible();
  await expect(page.getByRole('button', { name: 'ÜRÜNÜ İNCELE' }).first()).toBeFocused();
});

test('filter changes reveal newly mounted cards, including empty category recovery', async ({ page }) => {
  await page.goto('/menu');
  await page.getByRole('button', { name: 'Özel Seri', exact: true }).click();
  await expect(page.locator('.product-card')).toHaveCount(4);
  const first = page.locator('.product-card').first();
  await first.scrollIntoViewIfNeeded();
  await expect(first).toHaveAttribute('data-visible', 'true');
  await page.getByRole('button', { name: 'Tümü', exact: true }).click();
  await expect(page.locator('.product-card')).toHaveCount(11);
  await page.getByRole('button', { name: 'ÜRÜNÜ İNCELE' }).nth(7).click();
  await expect(page.getByRole('dialog').getByRole('group')).toHaveCount(1); // Quantity only; fixed special-series recipe.
});

test('hero controls and category links work', async ({ page }) => {
  await page.goto('/');
  await expect(page.getByRole('heading', { level: 1 })).toContainText('Mutluluğun');
  await page.getByRole('button', { name: 'Sonraki sunum' }).click();
  await expect(page.getByRole('heading', { level: 1 })).toContainText('Bir kova');
  await page.getByRole('button', { name: 'Sonraki sunum' }).click();
  await expect(page.getByRole('heading', { level: 1 })).toContainText('Günün en');
  await page.getByRole('button', { name: 'Önceki sunum' }).click();
  await expect(page.getByRole('heading', { level: 1 })).toContainText('Bir kova');
  await page.locator('.category-item').filter({ hasText: 'Kova Waffle' }).click();
  await expect(page.locator('.product-card')).toHaveCount(3);
  await expect(page.getByRole('button', { name: 'Kova Waffle', exact: true })).toHaveAttribute('aria-pressed', 'true');
});

test('motion preference changes live and header transitions', async ({ page }) => {
  await page.goto('/');
  await expect(page.locator('.site-header')).toHaveAttribute('data-hero', 'true');
  await page.locator('.editorial-section').scrollIntoViewIfNeeded();
  await expect(page.locator('.site-header')).toHaveAttribute('data-hero', 'false');
  await page.emulateMedia({ reducedMotion: 'reduce' });
  await expect(page.locator('html')).not.toHaveAttribute('data-motion-ready', 'true');
  await expect(page.locator('.editorial-section .section-heading')).toHaveCSS('opacity', '1');
  await page.emulateMedia({ reducedMotion: 'no-preference' });
  await expect(page.locator('html')).toHaveAttribute('data-motion-ready', 'true');
});

test('all local images load and layouts fit viewport', async ({ page }) => {
  for (const path of ['/', '/menu', '/galeri', '/iletisim']) {
    await page.goto(path);
    await page.addStyleTag({ content: 'html { scroll-behavior: auto !important; }' });
    await page.evaluate(async () => {
      for (let y = 0; y < document.body.scrollHeight; y += innerHeight) { scrollTo(0, y); await new Promise(r => setTimeout(r, 40)); }
      await Promise.all(Array.from(document.images).filter(img => img.getClientRects().length > 0).map(img => img.decode().catch(() => {})));
    });
    const broken = await page.locator('img').evaluateAll(imgs => imgs.filter((img): img is HTMLImageElement => img instanceof HTMLImageElement && img.getClientRects().length > 0).filter(img => !img.complete || img.naturalWidth === 0).map(img => img.src));
    expect(broken, path).toEqual([]);
    expect(await page.evaluate(() => document.documentElement.scrollWidth <= innerWidth), path).toBe(true);
  }
  for (const width of [320, 768]) {
    await page.setViewportSize({ width, height: 900 });
    await page.goto('/');
    await page.evaluate(() => document.fonts.ready);
    expect(await page.locator('h1').evaluate(el => el.scrollWidth <= el.clientWidth + 1), `hero title at ${width}px`).toBe(true);
    expect(await page.evaluate(() => document.documentElement.scrollWidth <= innerWidth)).toBe(true);
  }
});

test('admin and admin API routes no longer exist', async ({ request, page }) => {
  for (const path of ['/admin', '/admin/login', '/api/admin/products', '/api/admin/settings', '/api/admin/login', '/api/admin/logout']) {
    const response = await request.get(path);
    expect(response.status(), path).toBe(404);
  }
  await page.goto('/');
  await expect(page.getByRole('link', { name: /İşletme yönetimi/i })).toHaveCount(0);
});

test('static catalog and sanitized WhatsApp order request', () => {
  expect(seedProducts).toHaveLength(11);
  const message = buildOrderMessage(seedProducts[0], 999, { cikolata: ['Forged option', 'Sütlü çikolata'] }, ' test ');
  expect(message).toContain('Adet: 30');
  expect(message).not.toContain('Forged option');
  expect(message).toContain('Not: test');
});
