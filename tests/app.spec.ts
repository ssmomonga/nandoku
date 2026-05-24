import { test, expect } from '@playwright/test';
import path from 'path';

test.describe('難読地名クイズ', () => {
  test.beforeEach(async ({ page }) => {
    const filePath = path.resolve('index.html');
    await page.goto(`file://${filePath}`);
  });

  test('初期状態の確認', async ({ page }) => {
    await expect(page.locator('h1')).toHaveText('難読地名クイズ');
    await expect(page.locator('#start-area')).toBeVisible();
    await expect(page.locator('#region-select')).toBeVisible();
    await expect(page.locator('#count-btn-container')).toBeVisible();
  });

  test('クイズの開始と回答フロー', async ({ page }) => {
    // 1問選択
    await page.click('button[data-value="1"]');
    await page.click('#start-btn');

    // クイズエリアが表示される
    await expect(page.locator('#quiz-area')).toBeVisible();
    await expect(page.locator('#question-counter')).toContainText('問題 1 / 1');

    // 適当に回答
    await page.fill('#answer-input', 'テスト');
    await page.click('#submit-btn');

    // フィードバックが表示される
    await expect(page.locator('#feedback')).toBeVisible();
    await expect(page.locator('#submit-btn')).toHaveText('次の問題へ');

    // 結果画面へ
    await page.click('#submit-btn');
    await expect(page.locator('#result-area')).toBeVisible();
    await expect(page.locator('#score-display')).toContainText('1問中');
  });
});
