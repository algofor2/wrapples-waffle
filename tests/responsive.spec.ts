import { expect, test } from '@playwright/test';

test('eight viewport widths keep all public routes within the screen', async ({ page }, testInfo) => {
  test.skip(testInfo.project.name !== 'desktop', 'Viewport matrix runs once.');
  test.setTimeout(120_000);
  for (const width of [320, 375, 390, 430, 768, 1024, 1440, 1920]) {
    await page.setViewportSize({ width, height: 900 });
    for (const route of ['/', '/menu', '/galeri', '/iletisim']) {
      await page.goto(route);
      await page.evaluate(() => document.fonts.ready);
      const dimensions = await page.evaluate(() => ({ document: document.documentElement.scrollWidth, viewport: innerWidth }));
      expect(dimensions.document, `${route} at ${width}px`).toBeLessThanOrEqual(dimensions.viewport);
      const heading = page.locator('h1');
      expect(await heading.evaluate(el => el.scrollWidth <= el.clientWidth + 1), `heading on ${route} at ${width}px`).toBe(true);
    }
    if (width <= 430) {
      await page.goto('/menu');
      await page.getByRole('button', { name: 'Özel Seri', exact: true }).click();
      await expect(page.locator('.product-card')).toHaveCount(4);
      await page.locator('.product-card').last().scrollIntoViewIfNeeded();
      const tabsTop = await page.locator('.category-tabs').evaluate(el => el.getBoundingClientRect().top);
      expect(tabsTop, `sticky filters at ${width}px`).toBeGreaterThanOrEqual(65);
      expect(tabsTop, `sticky filters at ${width}px`).toBeLessThanOrEqual(80);
    }
  }
});

test('mobile product dialog keeps order action reachable and locks page scroll', async ({ page }, testInfo) => {
  test.skip(testInfo.project.name !== 'mobile', 'Mobile-only interaction.');
  await page.goto('/menu');
  await page.getByRole('button', { name: 'ÜRÜNÜ İNCELE' }).first().click();
  const dialog = page.getByRole('dialog');
  await expect(dialog).toBeVisible();
  expect(await page.locator('body').evaluate(el => getComputedStyle(el).overflow)).toBe('hidden');
  const order = dialog.getByRole('link', { name: /WHATSAPP'TAN SİPARİŞ TALEBİ/ });
  await order.scrollIntoViewIfNeeded();
  await expect(order).toBeVisible();
  await page.keyboard.press('Escape');
  await expect(dialog).not.toBeVisible();
  expect(await page.locator('body').evaluate(el => getComputedStyle(el).overflow)).not.toBe('hidden');
});

test('contact has a working direct-map fallback', async ({ page }) => {
  await page.goto('/iletisim');
  const directions = page.getByRole('link', { name: 'YOL TARİFİ AL' });
  await expect(directions).toBeVisible();
  expect(await directions.getAttribute('href')).toContain('maps.app.goo.gl/iCZPwHDjEikDu9Vb7');
  await expect(page.getByTitle('Wrapples Waffle Google Maps konumu')).toHaveAttribute('src', /google\.com\/maps\?/);
});
