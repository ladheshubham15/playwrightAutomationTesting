import { test, expect } from '@playwright/test';
import { WikipediaPage } from '../support/pages/WikipediaPage';
import { verifyExternalLinks } from '../support/helpers/helperFunctions';
import { LOCATORS } from '../support/locators';

test.describe('Wikipedia E2E Tests', () => {

  const searchTerm:string = 'Playwright';
  const articleName:string = 'Test engineer';
  const invalidSearchText:string ='sfjaslfjasljfljf';
  const articleFromSearchResult:string ='text=Test engineer';

  test.beforeEach('navigate to Wikipedia',async({page}) =>{
    const wikipediaPage = new WikipediaPage(page);
    await wikipediaPage.navigateTo('/');
  })

  test('Verify that a user can search for a topic using the search bar', async ({ page }) => {
    const wikipediaPage = new WikipediaPage(page);
    await wikipediaPage.searchFor(searchTerm);
    await wikipediaPage.verifyNavigationUrl(/.*Playwright.*/)
    //wait till page loads succuessfully and page gets in idle state
    await page.waitForLoadState('networkidle');
    const firstHeading = await wikipediaPage.getFirstHeading();
    //verifying header for search term
    await wikipediaPage.verifyTextHeading(firstHeading,searchTerm)
    //verifying content,refrences, external link section visible for wikipedia page
    await wikipediaPage.verifyWikipediaPageLoadedCorrectly();
  });

  test('Verify that a user can navigate to an article from search results', async ({ page }) => {
    const wikipediaPage = new WikipediaPage(page);
    await wikipediaPage.searchFor(articleName);
    //click on the article from search result
    await page.click(articleFromSearchResult);
    //wait till page loads succuessfully and page gets in idle state
    await page.waitForLoadState('networkidle');
    const firstHeading = await wikipediaPage.getFirstHeading();
    await wikipediaPage.verifyTextHeading(firstHeading,articleName)
    //verifying content,refrences, external link section visible for wikipedia page
    await wikipediaPage.verifyWikipediaPageLoadedCorrectly();
  });

  test('Verify that external links within Wikipedia articles are valid', async ({ page }) => {
    const wikipediaPage = new WikipediaPage(page);
    await wikipediaPage.navigateTo('/wiki/Agile_testing');
    await verifyExternalLinks(page, LOCATORS.externalLinksLocator);
  });

  test('Verify that a user can switch the language of the Wikipedia interface', async ({ page }) => {
    const wikipediaPage = new WikipediaPage(page);
    //changing language to spanish
    await page.click(LOCATORS.spanishLangLocator);
    expect(page).toHaveURL('https://es.wikipedia.org/wiki/Wikipedia:Portada');
    const mainPageText = await wikipediaPage.getTextContent(LOCATORS.mainPageDecsriptionLoactor);
    //verifying page content translated to spanish
    await wikipediaPage.verifyTextContent(mainPageText,'Portada')
  });

  test('Verify that appropriate message is displayed for invalid search queries', async ({ page }) => {
    const wikipediaPage = new WikipediaPage(page);
    await wikipediaPage.searchFor(invalidSearchText);
    const noResultsText = await wikipediaPage.getTextContent(LOCATORS.notFoundResultLocator);
    // verifying No result matching query text
    await wikipediaPage.verifyTextContent(noResultsText,'There were no results matching the query')
  });

  // Additional Test
  test('Verify that the main page loads correctly', async ({ page }) => {
    const wikipediaPage = new WikipediaPage(page);
    const mainPageTitle = await wikipediaPage.getTitle();
    expect(mainPageTitle).toBe('Wikipedia, the free encyclopedia');
  });


  // Additional Test
  test('Verify that a user can navigate using the table of contents', async ({ page }) => {
    const wikipediaPage = new WikipediaPage(page);
    const testingTypeLoc = 'a[href="#Testing_types"]';
    await wikipediaPage.navigateTo('/wiki/Software_testing');
    const tocLink = await page.$(testingTypeLoc);
    if (tocLink) {
      await tocLink.click();
      await page.waitForLoadState('networkidle')
      const heading = await page.$('h2:has-text("Testing types")');
      expect(heading).not.toBeNull();
    }
  });

});
