import { test, expect, Page } from '@playwright/test';

test("Search Functionality", async ({ page }: { page: Page }) => {
  await page.goto("https://www.britinsurance.com/");

  await page.locator("//button[@aria-label='Search button']").click();
  await page.locator("//input[@name='k']").fill("IFRS 17");

  await page.keyboard.press("Space");

  await page.waitForSelector("//div[@class='header--search__results']");

  const suggestions = await page.$$("//div[@class='header--search__results']//a");

  console.log("Suggestion count is: -", suggestions.length);
  console.log("Suggestion Names are: -");

  const suggestionNames: string[] = [];
  for (const suggestion of suggestions) {
    let text = await suggestion.textContent();
    if (text !== null && text !== undefined) {
    text = text.trim();
    suggestionNames.push(text);
    console.log(text);
    }
  }

  await page.keyboard.press("Enter");
  await page.waitForSelector("//div[@class='results-container']/div/div//a");

  const searchResults = await page.$$("//div[@class='results-container']/div/div//a");
  console.log("Search Result count is: -", searchResults.length);
  console.log("Search Result Names are: -");

  const searchResultNames: string[] = [];
  for (const result of searchResults) {
    let text = await result.textContent();
    if (text !== null && text !== undefined) {
      text = text.trim();
    searchResultNames.push(text);
    console.log(text);
  }
}

  // Assertion: Ensure all suggestions exist in search results
  for (const suggestionName of suggestionNames) {
    expect(searchResultNames).toContain(suggestionName);
  }

  console.log("Assertion Passed: All suggestion names are present in search results.");
});
