import { test, expect } from '@playwright/test';
import path from 'path';

test.describe('難読地名クイズ - 長野県', () => {
  test.beforeEach(async ({ page }) => {
    const filePath = path.resolve('index.html');
    await page.goto(`file://${filePath}`);
  });

  test('長野県が選択肢に存在すること', async ({ page }) => {
    const options = await page.locator('#region-select option').allInnerTexts();
    expect(options).toContain('長野');
  });

  test('長野県を選択してクイズを開始できること', async ({ page }) => {
    await page.selectOption('#region-select', 'nagano');
    await page.click('button[data-value="5"]');
    await page.click('#start-btn');

    await expect(page.locator('#quiz-area')).toBeVisible();
    await expect(page.locator('#question-counter')).toContainText('問題 1 / 5');

    // 長野県の難読地名のいずれかが表示されているはず
    const kanji = await page.locator('#kanji-display').innerText();
    const naganoKanjis = ["姨捨", "鼎", "鬼無里", "泰阜", "喬木", "茂菅", "海ノ口", "南木曽", "栂池", "梓川"];
    expect(naganoKanjis).toContain(kanji);
  });
});
