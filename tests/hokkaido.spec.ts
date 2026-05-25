import { test, expect } from '@playwright/test';
import path from 'path';

test.describe('北海道地名クイズ', () => {
  test.beforeEach(async ({ page }) => {
    const filePath = path.resolve('index.html');
    await page.goto(`file://${filePath}`);
  });

  test('北海道リージョンの選択とクイズ開始', async ({ page }) => {
    // 北海道を選択
    await page.selectOption('#region-select', 'hokkaido');

    // 5問選択（デフォルト）
    await page.click('#start-btn');

    // クイズエリアが表示される
    await expect(page.locator('#quiz-area')).toBeVisible();
    await expect(page.locator('#question-counter')).toContainText('問題 1 / 5');

    // 表示されている漢字が北海道の地名リストに含まれているか確認
    const hokkaidoKanji = [
        "重蘭窮", "占冠", "興部", "音威子府", "抜海", "濃昼", "屈斜路", "倶知安", "長万部", "忍路"
    ];
    const displayedKanji = await page.locator('#kanji-display').textContent();
    expect(hokkaidoKanji).toContain(displayedKanji);
  });
});
