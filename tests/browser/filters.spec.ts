import { test, expect } from '@playwright/test';
test('graduate degree and resource filters are reflected in the URL', async ({ page }) => {
  await page.goto('/fse-atlas/en/programs/');
  await page.getByRole('combobox', { name: 'Degree', exact: true }).selectOption('PhD');
  await expect(page.locator('.directory .entity-card')).toHaveCount(2);
  await expect(page).toHaveURL(/level=PhD/);
  await page.reload();
  await expect(page.locator('.directory .entity-card')).toHaveCount(2);
  await page.goto('/fse-atlas/en/resources/');
  await page.getByRole('combobox', { name: 'Format', exact: true }).selectOption('course');
  await expect(page.locator('.directory .entity-card')).toHaveCount(3);
  await page.getByRole('button', { name: 'Clear filters' }).click();
  await page.getByRole('combobox', { name: 'Access', exact: true }).selectOption('mixed');
  await expect(page.locator('.directory .entity-card')).toHaveCount(1);
  await expect(page.locator('.directory .entity-card')).toContainText('ISO 22000');
});
test('theme reveal originates at the control and reaches the viewport corners', async ({
  page,
}) => {
  await page.addInitScript(() => {
    const original = Element.prototype.animate;
    Element.prototype.animate = function (keyframes, options) {
      if (
        options &&
        typeof options === 'object' &&
        'pseudoElement' in options &&
        options.pseudoElement === '::view-transition-new(root)'
      ) {
        Object.assign(window, { themeAnimation: { keyframes, options } });
      }
      return original.call(this, keyframes, options);
    };
  });
  await page.goto('/fse-atlas/en/');
  await page.evaluate(() => document.fonts.ready);
  const box = await page.getByTestId('theme-toggle').boundingBox();
  expect(box).not.toBeNull();
  await page.getByTestId('theme-toggle').click();
  await expect
    .poll(() =>
      page.evaluate(() =>
        Boolean((window as unknown as { themeAnimation?: unknown }).themeAnimation),
      ),
    )
    .toBe(true);
  const animation = await page.evaluate(
    () =>
      (
        window as unknown as {
          themeAnimation: { keyframes: { clipPath: string[] }; options: { duration: number } };
        }
      ).themeAnimation,
  );
  expect(animation.options.duration).toBe(650);
  const x = box!.x + box!.width / 2,
    y = box!.y + box!.height / 2;
  expect(animation.keyframes.clipPath[0]).toBe(`circle(0px at ${x}px ${y}px)`);
  const viewport = page.viewportSize()!;
  const radius = Math.hypot(Math.max(x, viewport.width - x), Math.max(y, viewport.height - y));
  expect(animation.keyframes.clipPath[1]).toBe(`circle(${radius}px at ${x}px ${y}px)`);
});
