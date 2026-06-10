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

async function waitForCanvasPixels(page: Page, id: DemoId): Promise<void> {
  await page.waitForFunction(
    (tileId) => {
      const canvas = document.querySelector(`#${tileId} canvas`);
      if (!canvas || canvas.clientWidth < 8 || canvas.clientHeight < 8) {
        return false;
      }
      const gl =
        canvas.getContext("webgl2") ?? canvas.getContext("webgl");
      if (!gl) return false;
      const pixels = new Uint8Array(4);
      gl.readPixels(
        (canvas.width / 2) | 0,
        (canvas.height / 2) | 0,
        1,
        1,
        gl.RGBA,
        gl.UNSIGNED_BYTE,
        pixels,
      );
      return pixels[0] + pixels[1] + pixels[2] > 12;
    },
    id,
    { timeout: 15_000 },
  );
}

async function settleTile(page: Page, id: DemoId): Promise<void> {
  await page.goto(`/#${id}`);
  await page.locator(`#${id}`).scrollIntoViewIfNeeded();
  await page.waitForSelector(`#${id} canvas`, { state: "visible" });
  await waitForCanvasPixels(page, id);

  if (id === "demo-image-fade") {
    await page.waitForTimeout(2500);
  } else if (id === "demo-mouse") {
    const canvas = page.locator(`#${id} canvas`);
    const box = await canvas.boundingBox();
    if (box) {
      await page.mouse.move(box.x + box.width / 2, box.y + box.height / 2);
    }
    await page.waitForTimeout(1000);
  } else if (id === "demo-basic") {
    await page.waitForTimeout(2500);
  } else {
    await page.waitForTimeout(1500);
  }
}

/** Single-frame capture — avoids Playwright stability retries on animated WebGL. */
async function expectTileSnapshot(page: Page, id: DemoId): Promise<void> {
  const screenshot = await page.locator(`#${id}`).screenshot();
  expect(screenshot).toMatchSnapshot(`${id}.png`, {
    maxDiffPixelRatio: screenshotTolerance(id),
  });
}

for (const { id, label } of DEMO_LINKS) {
  test(`demo tile: ${label}`, async ({ page }) => {
    if (id === "demo-camera" && process.env.CI) {
      test.skip();
    }

    await settleTile(page, id);
    await expectTileSnapshot(page, id);
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
