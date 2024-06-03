import { Page } from '@playwright/test';


//navigate to external links , on navigation checks for response if response is not successful, then it throws error
export async function verifyExternalLinks(page: Page, selector: string) {
  const externalLinks = await page.$$eval(selector, links => links.map(link => link.href));
  for (const link of externalLinks) {
    const response = await page.goto(link);
    if (response) {
      if (response.status() >= 400) {
        throw new Error(`External link ${link} is not working correctly and returned status ${response.status()}`);
      }
    }
    await page.goBack();
  }
}
