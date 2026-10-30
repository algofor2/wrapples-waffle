import { test } from '@playwright/test';

test('capture complete visual review', async ({ page }, testInfo) => {
  test.setTimeout(90000);
  test.skip(!process.env.CAPTURE_VISUALS, 'Explicit screenshot capture only');
  const phase = process.env.CAPTURE_VISUALS === 'before' ? 'before' : 'after';
  for (const [path, name] of [['/', 'home'], ['/menu', 'menu'], ['/galeri', 'gallery'], ['/iletisim', 'contact']]) {
    await page.goto(path);
    await page.addStyleTag({ content: 'html { scroll-behavior: auto !important; }' });
    await page.evaluate(async () => {
      for (let y = 0; y < document.body.scrollHeight; y += innerHeight * .7) {
        scrollTo(0, y);
        await new Promise(resolve => setTimeout(resolve, 90));
      }
      scrollTo(0, 0);
      await Promise.race([document.fonts.ready, new Promise(r => setTimeout(r, 3000))]);
      await Promise.race([Promise.all(Array.from(document.images).map(image => image.decode().catch(() => {}))), new Promise(r => setTimeout(r, 4000))]);
    });
    await page.waitForTimeout(900);
    await page.screenshot({ path: `docs/premium-evidence/${phase}-${testInfo.project.name}-${name}.jpg`, fullPage: true, scale: 'css', type: 'jpeg', quality: 75 });
    if (phase === 'after' && name === 'menu') {
      await page.getByRole('button', { name: 'ÜRÜNÜ İNCELE' }).first().click();
      await page.getByRole('dialog').getByLabel('Sütlü çikolata', { exact: true }).check();
      await page.screenshot({ path: `docs/premium-evidence/after-${testInfo.project.name}-dialog.jpg`, scale: 'css', type: 'jpeg', quality: 85 });
      await page.keyboard.press('Escape');
    }
    if (name === 'home') await page.screenshot({ path: `docs/premium-evidence/${phase}-${testInfo.project.name}-hero.jpg`, scale: 'css', type: 'jpeg', quality: 85 });
  }
});
