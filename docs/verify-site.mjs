import { chromium } from '@playwright/test';
import fs from 'node:fs';
const browser = await chromium.launch({ executablePath: '/Applications/Google Chrome.app/Contents/MacOS/Google Chrome', headless: true });
const results=[];
for(const [name,width,height] of [['desktop',1440,900],['mobile',390,844]]){
 const page=await browser.newPage({viewport:{width,height},deviceScaleFactor:1});
 const errors=[];page.on('pageerror',e=>errors.push(e.message));
 for(const path of ['/','/menu','/galeri','/iletisim']){
  await page.goto('http://127.0.0.1:3000'+path,{waitUntil:'domcontentloaded',timeout:15000});
  await page.evaluate(async()=>{document.documentElement.style.scrollBehavior="auto";for(let y=0;y<document.body.scrollHeight;y+=500){scrollTo(0,y);await new Promise(r=>setTimeout(r,100));}await new Promise(r=>setTimeout(r,700));scrollTo(0,0)});
  await page.waitForTimeout(path === '/iletisim' ? 5000 : 700);
  const file=`docs/${name}-${path==='/'?'home':path.slice(1)}-final.png`;
  await page.screenshot({path:file,fullPage:true});
  const data=await page.evaluate(()=>({title:document.title,h1:document.querySelector('h1')?.innerText,products:document.querySelectorAll('.product-card').length,prices:/\b\d+[.,]?\d*\s*(?:TL|₺)\b/i.test(document.body.innerText),franchise:/franchise|bayilik/i.test(document.body.innerText),cart:/\bsepet\b/i.test(document.body.innerText),horizontalOverflow:document.documentElement.scrollWidth>innerWidth,reveals:Array.from(document.querySelectorAll('[data-reveal]')).filter(x=>x.getAttribute('data-visible')==='true').length,images:Array.from(document.querySelectorAll('img')).map(x=>({src:x.getAttribute('src'),loaded:x.complete&&x.naturalWidth>0}))}));
  results.push({view:name,path,file,...data});
 }
 if(name==='desktop'){
  await page.goto('http://127.0.0.1:3000/menu',{waitUntil:'domcontentloaded',timeout:15000});
  await page.getByRole('button',{name:'ÜRÜNÜ İNCELE'}).first().click();
  await page.getByRole('button',{name:'Adedi artır'}).click();
  await page.getByPlaceholder('Varsa tercihinizi yazın').fill('Çilek olsun');
  const href=await page.getByRole('link',{name:/WHATSAPP'TAN SİPARİŞ TALEBİ/}).getAttribute('href');
  results.push({orderLink:href});
 }
 results.push({view:name,errors});await page.close();
}
fs.writeFileSync('docs/site-verification.json',JSON.stringify(results,null,2));
console.log(JSON.stringify(results.map(({images,...x})=>({...x,imageCount:images?.length,unloaded:images?.filter(i=>!i.loaded)})),null,2));
await browser.close();
