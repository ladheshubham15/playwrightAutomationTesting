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

  async verifyElementsToVisible(locator:string ) {
    expect(this.page.locator(locator)).toBeVisible();
  }

  //verifying content,refrences, external link section visible for wikipedia page
  async verifyWikipediaPageLoadedCorrectly() {
    this.verifyElementsToVisible(LOCATORS.contentSectionLocator);
    this.verifyElementsToVisible(LOCATORS.referencesSectionLocator);
    this.verifyElementsToVisible(LOCATORS.externalLinksSectionLocator);
  }

  //verifying that we are visiting correct url
  async verifyNavigationUrl(url: RegExp | string){
    expect(this.page).toHaveURL(url);
  }

  //verifying text heading we are getting from website is same as expected header
  async verifyTextHeading(receievedHeading:string | null,expectedHeading:string) {
    expect(receievedHeading).toEqual(expectedHeading);
  }

  //verifying text content we are receieving from website locator is same as expected test
  async verifyTextContent(receievedText:any,expectedText:string) {
    expect(receievedText).toContain(expectedText);
  }

  //returns the text content from website locator
  async getTextContent(locator: any) {
    return await this.page.textContent(locator);
  }

}
