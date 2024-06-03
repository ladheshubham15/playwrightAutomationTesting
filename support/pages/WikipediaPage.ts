import { BasePage } from './BasePage';
import { LOCATORS } from '../locators';
import { expect } from '@playwright/test';

export class WikipediaPage extends BasePage {
  //searching the term on wikipedia page
  async searchFor(term: string) {
    await this.page.fill(LOCATORS.searchInput, term);
    await this.page.press(LOCATORS.searchInput, 'Enter');
  }

  //returning first heading of page [search result heading]
  async getFirstHeading() {
    return this.page.textContent(LOCATORS.firstHeading);
  }

  //verifying content,refrences, external link section visible for wikipedia page
  async verifyWikipediaPageLoadedCorrectly() {
    expect(this.page.locator(LOCATORS.contentSectionLocator)).toBeVisible();
    expect(this.page.locator(LOCATORS.referencesSectionLocator)).toBeVisible();
    expect(this.page.locator(LOCATORS.externalLinksSectionLocator)).toBeVisible();
  }

  async verifyNavigationUrl(url: RegExp | string){
    expect(this.page).toHaveURL(url);
  }

  async verifyTextHeading(receievedHeading:string | null,expectedHeading:string) {
    expect(receievedHeading).toEqual(expectedHeading);
  }

  async verifyTextContent(receievedText:any,expectedText:string) {
    expect(receievedText).toContain(expectedText);
  }

  async getTextContent(locator: any) {
    return await this.page.textContent(locator);
  }

}
