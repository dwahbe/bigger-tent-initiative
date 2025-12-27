import { chromium } from 'playwright';

const html = `
<!DOCTYPE html>
<html>
<head>
  <link href="https://fonts.googleapis.com/css2?family=Merriweather:wght@400&display=swap" rel="stylesheet">
  <style>
    * { margin: 0; padding: 0; box-sizing: border-box; }
    body {
      width: 1200px;
      height: 630px;
      display: flex;
      align-items: center;
      background: linear-gradient(135deg, #C84536 0%, #3A4A7A 100%);
      padding: 80px;
    }
    h1 {
      font-family: 'Merriweather', serif;
      font-size: 80px;
      font-weight: 400;
      color: white;
      line-height: 1.3;
      font-variant: small-caps;
    }
  </style>
</head>
<body>
  <h1>The Bigger<br>Tent Initiative</h1>
</body>
</html>
`;

async function generateOG() {
  const browser = await chromium.launch();
  const page = await browser.newPage();
  
  await page.setViewportSize({ width: 1200, height: 630 });
  await page.setContent(html);
  
  // Wait for fonts to load
  await page.waitForTimeout(500);
  
  await page.screenshot({ 
    path: 'public/og.png',
    type: 'png'
  });
  
  await browser.close();
  console.log('✓ Generated public/og.png');
}

generateOG();

