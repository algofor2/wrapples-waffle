import fs from 'node:fs';
import { createRequire } from 'node:module';
const require = createRequire(import.meta.url);
const { chromium } = require('/Users/mustafasenoglu/.npm/_npx/ad9a3fdbcad992c6/node_modules/playwright-core');
const browser = await chromium.launch({ executablePath: '/Applications/Google Chrome.app/Contents/MacOS/Google Chrome', headless: true });
const sites = { sweet: 'https://www.mysweetwaffle.com.tr/', belgian: 'https://www.thebelgianwaffle.co/', aberfa: 'https://aberfa.com/' };
for (const [name, url] of Object.entries(sites)) {
  for (const [size, width, height] of [['desktop', 1440, 900], ['tablet', 768, 1024], ['mobile', 375, 812]]) {
    const page = await browser.newPage({ viewport: { width, height }, reducedMotion: 'no-preference', locale: 'tr-TR' });
    const network = [];
    page.on('response', r => network.push({ url: r.url(), status: r.status(), type: r.request().resourceType() }));
    let navigationError = null;
    try { await page.goto(url, { waitUntil: 'domcontentloaded', timeout: 18000 }); } catch (e) { navigationError = String(e); }
    await page.waitForTimeout(800);
    const data = await page.evaluate(() => {
      const css = el => { const s = getComputedStyle(el); const b = el.getBoundingClientRect(); return { tag: el.tagName.toLowerCase(), text: (el.innerText || '').trim().slice(0, 120), x: Math.round(b.x), y: Math.round(b.y), width: Math.round(b.width), height: Math.round(b.height), fontFamily: s.fontFamily, fontSize: s.fontSize, fontWeight: s.fontWeight, lineHeight: s.lineHeight, color: s.color, background: s.backgroundColor, display: s.display, position: s.position, gap: s.gap, padding: s.padding, transition: s.transition, animation: s.animation }; };
      const select = q => Array.from(document.querySelectorAll(q)).slice(0, 8).map(css);
      return { title: document.title, url: location.href, viewport: { width: innerWidth, height: innerHeight, scrollHeight: document.documentElement.scrollHeight }, body: css(document.body), header: select('header, nav'), hero: select('main > section:first-child, .hero, [class*=hero], h1'), headings: select('h1,h2,h3'), buttons: select('button, a[class*=btn], a[class*=button]'), cards: select('[class*=card], article'), images: select('main img'), scripts: [...document.scripts].map(s => s.src).filter(Boolean).slice(0, 30), stylesheets: [...document.styleSheets].map(s => s.href).filter(Boolean).slice(0, 20), links: [...document.querySelectorAll('a[href]')].slice(0, 35).map(a => ({ text: a.innerText.trim().slice(0, 50), href: a.getAttribute('href') })) };
    }).catch(e => ({ evaluateError: String(e) }));
    fs.writeFileSync(`docs/reverse-evidence/${name}-${size}-measure.json`, JSON.stringify({ navigationError, data, network: network.slice(0, 120) }, null, 2));
    if (name === 'belgian') await page.screenshot({ path: `docs/reverse-evidence/${name}-${size}-playwright.png` }).catch(() => {});
    console.log(name, size, navigationError || data.title, data.viewport?.scrollHeight, network.length);
    await page.close();
  }
}
await browser.close();
