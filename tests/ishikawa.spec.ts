import { test, expect } from '@playwright/test';
import path from 'path';

test.describe('難読地名クイズ - 石川県', () => {
  test.beforeEach(async ({ page }) => {
    const filePath = path.resolve('index.html');
    await page.goto(`file://${filePath}`);
  });

  test('石川県が選択肢に存在すること', async ({ page }) => {
    const options = await page.locator('#region-select option').allInnerTexts();
    expect(options).toContain('石川');
  });

  test('石川県を選択してクイズを開始できること', async ({ page }) => {
    await page.selectOption('#region-select', 'ishikawa');
    await page.click('button[data-value="5"]');
    await page.click('#start-btn');

    await expect(page.locator('#quiz-area')).toBeVisible();
    await expect(page.locator('#question-counter')).toContainText('問題 1 / 5');

    // 石川県の難読地名のいずれかが表示されているはず
    const kanji = await page.locator('#kanji-display').innerText();
    const ishikawaKanjis = ["羽咋", "珠洲", "鳳至", "蚊爪", "四十万", "主計町", "宇出津", "動橋", "宝達志水", "直下"];
    expect(ishikawaKanjis).toContain(kanji);
  });
});
