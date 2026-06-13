import { test, expect, type Page } from "@playwright/test";
import { DEMO_LINKS, type DemoId, screenshotTolerance } from "./demo-links";

function trackGlslErrors(page: Page): string[] {
  const errors: string[] = [];
  page.on("console", (msg) => {
    if (msg.type() !== "error") return;
    const text = msg.text();
    if (!text.includes("glsl-helpers-react:")) return;
    if (text.includes("Camera access failed")) return;
    if (text.includes("Shader compiler log: null")) return;
    errors.push(text);
  });
  return errors;
}

async function waitForCanvasLayout(page: Page, id: DemoId): Promise<void> {
  await page.waitForSelector(`#${id} canvas`, { state: "visible" });
  await page.waitForFunction(
    (tileId) => {
      const canvas = document.querySelector(`#${tileId} canvas`);
      return (
        !!canvas &&
        canvas.clientWidth >= 8 &&
        canvas.clientHeight >= 8 &&
        canvas.width >= 8 &&
        canvas.height >= 8
      );
    },
    id,
    { timeout: 15_000 },
  );
}

const SETTLE_MS: Partial<Record<DemoId, number>> = {
  "demo-image-fade": 3000,
  "demo-mouse": 2000,
  "demo-clock": 2500,
  "demo-basic": 2500,
  "demo-persistent-time": 2500,
  "demo-uniforms": 2500,
  "demo-data-texture": 2500,
  "demo-cube": 2500,
};

async function prepareTile(page: Page, id: DemoId): Promise<void> {
  switch (id) {
    case "demo-image-fade":
      await page.waitForFunction(
        (tileId) => {
          const tile = document.getElementById(tileId);
          if (!tile) return false;
          return parseFloat(window.getComputedStyle(tile).opacity) > 0.9;
        },
        id,
        { timeout: 30_000 },
      );
      break;
    case "demo-mouse": {
      const canvas = page.locator(`#${id} canvas`);
      const box = await canvas.boundingBox();
      if (box) {
        await page.mouse.move(box.x + box.width / 2, box.y + box.height / 2);
        await page.mouse.down();
      }
      break;
    }
    case "demo-keyboard":
      await page.keyboard.press("ArrowRight");
      await page.keyboard.press("ArrowUp");
      break;
    default:
      break;
  }
}

async function settleTile(page: Page, id: DemoId): Promise<void> {
  // One WebGL context per test — avoids Chrome's ~16-context limit on the full grid.
  await page.goto(`/?solo=${id}#${id}`);
  await page.locator(`#${id}`).scrollIntoViewIfNeeded();
  await waitForCanvasLayout(page, id);
  await prepareTile(page, id);
  await page.waitForTimeout(SETTLE_MS[id] ?? 2000);
}

async function assertTileGridSize(page: Page, id: DemoId): Promise<void> {
  await page.waitForFunction(
    (tileId) => {
      const tile = document.getElementById(tileId);
      if (!tile) return false;
      const { width } = tile.getBoundingClientRect();
      // Grid cell ≈ viewport/3; full-row solo stretch is ~3× wider.
      return width > 0 && width <= window.innerWidth * 0.38;
    },
    id,
    { timeout: 5_000 },
  );
}

/** Single-frame capture — avoids Playwright stability retries on animated WebGL. */
async function expectTileSnapshot(page: Page, id: DemoId): Promise<void> {
  await assertTileGridSize(page, id);
  const screenshot = await page.locator(`#${id}`).screenshot();
  expect(screenshot).toMatchSnapshot(`${id}.png`, {
    maxDiffPixelRatio: screenshotTolerance(id),
  });
}

for (const { id, label } of DEMO_LINKS) {
  test(`demo tile: ${label}`, async ({ page }) => {
    if (id === "demo-camera" && !process.env.PLAYWRIGHT_CAMERA) {
      test.skip();
    }

    const errors = trackGlslErrors(page);
    await settleTile(page, id);
    await expectTileSnapshot(page, id);
    expect(errors, `shader errors on #${id}`).toEqual([]);
  });
}

test("scroll cue visible on first viewport", async ({ page }) => {
  const errors = trackGlslErrors(page);
  await page.goto("/");
  await page.waitForSelector("nav[aria-label='Demo index']");
  await page.waitForTimeout(4000);

  await expect(page.getByText("Scroll for more demos")).toBeVisible();
  expect(errors, "fatal shader errors after full grid load").toEqual([]);
});

test("canvas backing store matches layout size", async ({ page }) => {
  await page.goto("/");
  await page.waitForTimeout(2000);

  const mismatches = await page.evaluate(() => {
    return [...document.querySelectorAll("canvas")]
      .map((canvas, i) => {
        const rect = canvas.getBoundingClientRect();
        const ratioX = canvas.width / rect.width;
        const ratioY = canvas.height / rect.height;
        return {
          i,
          ratioX,
          ratioY,
          ok:
            Math.abs(ratioX - 1) <= 0.02 && Math.abs(ratioY - 1) <= 0.02,
        };
      })
      .filter((entry) => !entry.ok);
  });

  expect(mismatches, "canvas CSS vs backing-store mismatch").toEqual([]);
});
