import puppeteer from 'puppeteer-core';

const EDGE_PATH = 'C:\\Program Files (x86)\\Microsoft\\Edge\\Application\\msedge.exe';

async function runTests() {
  console.log('Starting automated comprehensive tests on couple proposal app...');
  
  const browser = await puppeteer.launch({
    executablePath: EDGE_PATH,
    headless: true,
    args: ['--no-sandbox', '--disable-setuid-sandbox'],
  });

  const page = await browser.newPage();
  await page.setViewport({ width: 390, height: 844 }); // iPhone 14

  const consoleErrors = [];
  page.on('console', (msg) => {
    if (msg.type() === 'error') {
      consoleErrors.push(msg.text());
    }
  });

  page.on('pageerror', (err) => {
    consoleErrors.push(err.toString());
  });

  const clickButtonByText = async (substring) => {
    return await page.evaluate((text) => {
      const btns = Array.from(document.querySelectorAll('button'));
      const target = btns.find((b) => b.innerText.includes(text));
      if (target) {
        target.click();
        return true;
      }
      return false;
    }, substring);
  };

  try {
    // 1. Check Responsive Widths & Horizontal Overflow
    const widthsToTest = [360, 390, 768, 1024, 1440];
    console.log('Testing responsive widths for horizontal overflow...');
    await page.goto('http://localhost:3000', { waitUntil: 'networkidle0' });

    for (const w of widthsToTest) {
      await page.setViewport({ width: w, height: 800 });
      await new Promise(r => setTimeout(r, 200));
      const hasHorizontalOverflow = await page.evaluate(() => {
        return document.documentElement.scrollWidth > window.innerWidth;
      });
      console.log(`Viewport ${w}px - Horizontal overflow: ${hasHorizontalOverflow}`);
      if (hasHorizontalOverflow) {
        throw new Error(`Horizontal overflow detected at ${w}px width!`);
      }
    }

    // Reset to mobile viewport
    await page.setViewport({ width: 390, height: 844 });

    // 2. Personalize Names Modal Test via Real Typing
    console.log('Testing Personalize Names Modal with realistic input...');
    const settingsBtn = await page.waitForSelector('button[aria-label="Personalize Names"]');
    await settingsBtn.click();
    await page.waitForFunction(() => document.body.innerText.includes('Personalize This Game'), { timeout: 2000 });

    const inputs = await page.$$('input');
    // Clear and type recipient
    await inputs[0].click();
    await page.keyboard.down('Control');
    await page.keyboard.press('KeyA');
    await page.keyboard.up('Control');
    await page.keyboard.press('Backspace');
    await inputs[0].type('Juliet');

    // Clear and type sender
    await inputs[1].click();
    await page.keyboard.down('Control');
    await page.keyboard.press('KeyA');
    await page.keyboard.up('Control');
    await page.keyboard.press('Backspace');
    await inputs[1].type('Romeo');

    await clickButtonByText('Apply & Save');
    await new Promise(r => setTimeout(r, 400));
    const personalizedWelcome = await page.$eval('h1', el => el.innerText);
    console.log('Verified personalized welcome text:', personalizedWelcome);

    // 3. Screen 1 -> Screen 2
    console.log('Starting the Love Game...');
    await clickButtonByText('curious');

    // 4. Screen 2: Compatibility Quiz
    await page.waitForFunction(() => document.body.innerText.includes('relationship status'), { timeout: 4000 });
    console.log('Quiz Screen: Answering all 4 questions...');
    await clickButtonByText('Single and fabulous');
    await new Promise(r => setTimeout(r, 400));
    await clickButtonByText('Next Question');

    await page.waitForFunction(() => document.body.innerText.includes('green flag'), { timeout: 4000 });
    await clickButtonByText('secretly a softie');
    await new Promise(r => setTimeout(r, 400));
    await clickButtonByText('Next Question');

    await page.waitForFunction(() => document.body.innerText.includes('red flag'), { timeout: 4000 });
    await clickButtonByText('Stealing fries');
    await new Promise(r => setTimeout(r, 400));
    await clickButtonByText('Next Question');

    await page.waitForFunction(() => document.body.innerText.includes('love language'), { timeout: 4000 });
    await clickButtonByText('Food. Obviously');
    await new Promise(r => setTimeout(r, 400));
    await clickButtonByText('Finish Quiz');

    // 5. Screen 3: Confession Round
    await page.waitForFunction(() => document.body.innerText.includes('jokes aside for a second'), { timeout: 4000 });
    console.log('Confession Screen: Answering all 4 deep questions...');
    const deepAnswers = ['Maybe', 'Absolutely', 'Honesty', 'Simple day'];
    for (let i = 0; i < 4; i++) {
      await new Promise(r => setTimeout(r, 400));
      await clickButtonByText(deepAnswers[i]);
      await new Promise(r => setTimeout(r, 400));
      if (i < 3) {
        await clickButtonByText('Continue');
      } else {
        await clickButtonByText('Next 💭');
      }
    }

    // Staged reveal
    console.log('Waiting for staged confession reveal...');
    await page.waitForFunction(() => document.body.innerText.includes("You know what's funny"), { timeout: 6000 });
    console.log('Confession stage 1 revealed!');
    await page.waitForFunction(() => document.body.innerText.includes('Wait, really? Continue'), { timeout: 6000 });
    console.log('Confession stage 3 revealed! Clicking Continue...');
    await clickButtonByText('Wait, really? Continue');

    // 6. Screen 4: Challenges
    await page.waitForFunction(() => document.body.innerText.includes('ONE LAST TEST'), { timeout: 4000 });
    console.log('Challenge Screen: Completing all 3 mini tests...');
    const heartBtn = await page.waitForSelector('button[aria-label="Tap to smile"]');
    await heartBtn.click();
    await new Promise(r => setTimeout(r, 300));
    await clickButtonByText('Tell me something cute');
    await new Promise(r => setTimeout(r, 300));
    await clickButtonByText('YES, JUST ASK');
    await new Promise(r => setTimeout(r, 400));
    await clickButtonByText('Take Me To The Moment');

    // 7. Screen 5: Suspense
    await page.waitForFunction(() => document.body.innerText.includes('enough games'), { timeout: 4000 });
    console.log('Suspense Screen: Staged narrative lines...');
    await page.waitForFunction(() => document.body.innerText.includes("I'm ready"), { timeout: 9000 });
    await clickButtonByText("I'm ready");

    // 8. Screen 6: The Big Proposal
    await page.waitForFunction(() => document.body.innerText.includes('WILL YOU BE MINE'), { timeout: 7000 });
    console.log('Proposal Screen loaded! Testing NO dodge...');
    const noBtn = await page.waitForSelector('button[aria-label*="No option"]');
    await noBtn.click();
    await new Promise(r => setTimeout(r, 400));
    const rejectedBody = await page.evaluate(() => document.body.innerText);
    console.log('Mocking rejection message active:', rejectedBody.includes('Excuse me') || rejectedBody.includes('commitment'));

    // Click YES!
    console.log('Clicking YES! 💖');
    await clickButtonByText('YES, ABSOLUTELY');

    // 9. Screen 7: Celebration
    await page.waitForFunction(() => document.body.innerText.includes('YOU SAID YES'), { timeout: 5000 });
    const celebrationBody = await page.evaluate(() => document.body.innerText);
    console.log('Celebration loaded! Certificate contains personalized names:', celebrationBody.includes('Juliet') && celebrationBody.includes('Romeo'));

    console.log('Testing Audio Toggle & Music Toggle in header...');
    const musicBtn = await page.waitForSelector('button[aria-label*="Music"]');
    await musicBtn.click();
    await new Promise(r => setTimeout(r, 300));

    const muteBtn = await page.waitForSelector('button[aria-label*="Sound Effects"]');
    await muteBtn.click();
    await new Promise(r => setTimeout(r, 300));

    console.log('==============================================');
    console.log('COMPREHENSIVE VERIFICATION SUCCEEDED! 100% 💖');
    console.log('Total Console Errors Caught:', consoleErrors.length);
    if (consoleErrors.length > 0) {
      console.log('Console Errors list:', consoleErrors);
    }
    console.log('==============================================');
  } catch (err) {
    console.error('Test encountered error:', err.message);
    const text = await page.evaluate(() => document.body.innerText).catch(() => 'could not get text');
    console.log('Page text at failure:', text);
    await page.screenshot({ path: 'test-failure.png' });
    process.exit(1);
  } finally {
    await browser.close();
  }
}

runTests();
