const { chromium } = require('playwright-core');
const path = require('path');
const fs = require('fs');

async function record() {
  const videoDir = '/tmp/recordings';
  if (!fs.existsSync(videoDir)) {
    fs.mkdirSync(videoDir, { recursive: true });
  }

  const chromePath = '/root/.cache/ms-playwright/chromium-1243/chrome-linux64/chrome';
  console.log('Launching chrome from:', chromePath);

  const browser = await chromium.launch({
    executablePath: chromePath,
    headless: true,
    args: [
      '--no-sandbox',
      '--disable-setuid-sandbox',
      '--disable-dev-shm-usage',
      '--disable-gpu',
      '--window-size=1240,780'
    ]
  });

  const context = await browser.newContext({
    viewport: { width: 1240, height: 780 },
    recordVideo: {
      dir: videoDir,
      size: { width: 1240, height: 780 }
    }
  });

  const page = await context.newPage();
  console.log('Navigating to http://localhost:3000 ...');
  await page.goto('http://localhost:3000', { waitUntil: 'networkidle' });
  await page.waitForTimeout(1500);

  // 1. Showcase Minimal Homepage & Dark Mode
  console.log('1. Toggling Dark Mode on Homepage...');
  await page.click('button[aria-label="Toggle dark mode"]');
  await page.waitForTimeout(1200);
  await page.click('button[aria-label="Toggle dark mode"]');
  await page.waitForTimeout(1000);

  // Scroll smoothly to see signature features
  await page.evaluate(() => window.scrollBy({ top: 480, behavior: 'smooth' }));
  await page.waitForTimeout(1800);
  await page.evaluate(() => window.scrollTo({ top: 0, behavior: 'smooth' }));
  await page.waitForTimeout(1200);

  // 2. Click "Book for Patient" -> Prompts Auth Gate
  console.log('2. Clicking Book for Patient (Auth Gate)...');
  await page.click('text="Book for Patient"');
  await page.waitForTimeout(1500);

  // 3. One-tap Demo Sign In as Family (Vikram Verma)
  console.log('3. Signing in as Vikram Verma (Family)...');
  const demoFamilyBtn = await page.waitForSelector('text="Vikram Verma"');
  await demoFamilyBtn.click();
  await page.waitForTimeout(1500);

  // 4. In Booking Form: Select Scheduled Night Vigil & Sathi Skill Badge
  console.log('4. Configuring Night Vigil and Sathi Skill Badge in Booking Form...');
  await page.click('text="Night Vigil (8 PM - 8 AM)"');
  await page.waitForTimeout(1000);

  // Select "Night Vigil Specialist" skill badge chip
  await page.click('button:has-text("Night Vigil Specialist")');
  await page.waitForTimeout(1000);

  // Submit Booking Request
  console.log('5. Submitting Booking Request...');
  await page.click('button:has-text("Request CareSathi Attendant")');
  await page.waitForTimeout(1800);

  // 6. In Matching Radar: View Specialist Matching
  console.log('6. In Matching Radar with 100% Badge Match...');
  await page.waitForTimeout(2200);

  // Click "Confirm Sathi" on top match
  const confirmBtn = await page.waitForSelector('button:has-text("Confirm Sathi")');
  await confirmBtn.click();
  await page.waitForTimeout(2000);

  // 7. In Active Duty View: Share OTP & Verify
  console.log('7. Active Bedside Duty View: Verifying Bedside OTP...');
  await page.click('button:has-text("Verify Attendant Arrival")');
  await page.waitForTimeout(800);
  
  // Fill OTP input
  const otpInput = await page.$('input[placeholder="Enter 4-digit OTP"]');
  if (otpInput) {
    // Get start OTP from screen or use default
    const otpValue = await page.evaluate(() => {
      const el = document.querySelector('.text-3xl.font-black.font-mono');
      return el ? el.textContent.trim() : '1234';
    });
    await otpInput.fill(otpValue);
    await page.waitForTimeout(600);
    await page.click('button:has-text("Confirm Presence & Start Duty")');
    await page.waitForTimeout(1500);
  }

  // 8. Open Multi-Family Live Watch Link Modal
  console.log('8. Opening Multi-Family Live Watch Modal...');
  await page.click('button:has-text("Family Watch")');
  await page.waitForTimeout(2000);
  await page.click('button:has-text("Copy Shareable Link")');
  await page.waitForTimeout(1200);
  // Close Watch modal
  const closeWatchBtn = await page.$('div[role="dialog"] button, .fixed button');
  if (closeWatchBtn) {
    await closeWatchBtn.click();
    await page.waitForTimeout(1000);
  }

  // 9. Trigger Floating SOS Emergency Alert
  console.log('9. Triggering Floating SOS Emergency Button...');
  await page.click('button:has-text("SOS Emergency")');
  await page.waitForTimeout(2500);
  await page.click('button:has-text("Close Alert")');
  await page.waitForTimeout(1000);

  // 10. Switch to Attendant Partner Mode Console
  console.log('10. Visiting Attendant Partner Mode Console...');
  await page.click('text="Attendant Mode"');
  await page.waitForTimeout(2000);

  // Log 90-Min Awake Vigil Check
  const awakeBtn = await page.$('button:has-text("Vitals steady, IV normal")');
  if (awakeBtn) {
    await awakeBtn.click();
    await page.waitForTimeout(1500);
  }

  // Final overview pause
  await page.waitForTimeout(2000);

  console.log('Closing browser and finalizing video...');
  await context.close();
  await browser.close();

  const files = fs.readdirSync(videoDir);
  console.log('Recorded video files in /tmp/recordings:', files);
  const videoFile = files.find(f => f.endsWith('.webm'));
  if (videoFile) {
    const fullVideoPath = path.join(videoDir, videoFile);
    console.log('FULL_VIDEO_PATH=' + fullVideoPath);
  }
}

record().catch(err => {
  console.error('Recording error:', err);
  process.exit(1);
});
