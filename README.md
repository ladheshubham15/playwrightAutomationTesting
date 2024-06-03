# playwrightAutomationTesting

This repository contains end-to-end (E2E) tests for the Wikipedia website using the Playwright framework with TypeScript. The tests cover various functionalities of the Wikipedia site, including search, navigation, language switching, and more.

## Project Structure

```
PLAYWRIGHTAUTOMATION/
├── tests/
│   └── wikipediaTests.spec.ts
├── support/
│   ├── pages/
│   │   ├── BasePage.ts
│   │   └── WikipediaPage.ts
│   ├── helpers/
│   │   └── helperFunctions.ts
│   └── locators.ts
├── playwright.config.ts
├── package.json
└── README.md
```

- `tests/`: Contains the test files.
- `support/pages/`: Contains the page object models.
  - `BasePage.ts`: Contains common functions for all pages.
  - `WikipediaPage.ts`: Contains Wikipedia-specific locators and functions.
- `support/helpers/`: Contains utility functions.
  - `helpers.ts`: Contains helper functions, such as verifying external links.
- `support/locators.ts`: Contains locators used in the tests.
- `package.json`: Node.js project configuration file.

## Setup

### Prerequisites

- [Node.js](https://nodejs.org/en/download/) (v14 or higher)
- [npm](https://www.npmjs.com/get-npm) (v6 or higher)

### Installation

1. Clone the repository:

   ```sh
   git clone https://github.com/ladheshubham15/playWrightAutomation.git
   cd playWrightAutomation
   ```

2. Install the dependencies:

   ```sh
   npm install
   ```

3. Install Playwright
```sh
npm init playwright@latest
```

## Running Tests

### Run All Tests

To run all the tests, use the following command:

In headless mode:
```sh
npx playwright test 
```
In headed mode:
```sh
npx playwright test --headed

### Viewing Test Reports

Playwright generates an HTML report by default. To view the test report, use:

```sh
npx playwright show-report
```

## Test Cases

The test cases cover the following scenarios:

1. **Search Functionality**: Verify that a user can search for a topic using the search bar.
2. **Navigation to Article**: Verify that a user can navigate to an article from search results.
3. **External Links Verification**: Verify that external links within Wikipedia articles are valid.
4. **Language Switching**: Verify that a user can switch the language of the Wikipedia interface.
5. **Invalid Search Handling**: Verify that appropriate message is displayed for invalid search queries.
6. **Main Page Load**: Verify that the main page loads correctly.
7. **Table of Contents Navigation**: Verify that a user can navigate using the table of contents.

## Contribution

If you want to contribute to this project, follow these steps:

1. Fork the repository.
2. Create a new branch: `git checkout -b my-feature-branch`
3. Make your changes and commit them: `git commit -m 'Add some feature'`
4. Push to the branch: `git push origin my-feature-branch`
5. Open a pull request.

## Adding Timeouts
Update playwright.config.ts to define custom Timeouts

```json 
  timeout: 30 * 1000,  //for elements display or to visible

  expect:{
    timeout: 5000,  // assertions timeout
  },
```

## Running Tests in Parallel

 /* Run tests in files in parallel */
 ```json
  fullyParallel: true,
```

## Running Tests on Multiple Browsers

Update projects section in playwright.config.ts as below:

```json
 {
      name: 'chromium',
      use: { ...devices['Desktop Chrome'] },
    },

    {
      name: 'firefox',
      use: { ...devices['Desktop Firefox'] },
    },

    {
      name: 'webkit',
      use: { ...devices['Desktop Safari'] },
    },
```

##  Test Run Report Generation 

 /* Reporter to use. See https://playwright.dev/docs/test-reporters */
 ```json
 {
  reporter: 'html', //this generates report in HTML format and displayed on default browser
 }
  ```

## setting up base url

baseUrl can be declared under defineConfig function in playwright.config.ts as below:

```json
{
  use: {
    baseURL: 'https://en.wikipedia.org',
  },
}
```

## CI-CD setup

  Using playwright.yml under .github\workflows we can define steps , dependencies, configuration. Using this file we can actually setup test runs after pull request updated and before and pushing commits to main branch.

  