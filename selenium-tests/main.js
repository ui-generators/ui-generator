// Reference: https://hix.dev/tutorials/react-next-js/end-to-end-tests-with-selenium
import formTests from "./form.js";
import { Builder } from "selenium-webdriver";
import chrome from "selenium-webdriver/chrome.js";

const options = new chrome.Options();
options.addArguments("--headless");

const driver = new Builder()
    .forBrowser("chrome")
    .setChromeOptions(options)
    .build();

// async function initializeWebDriver() {
//     try {
//         const driver = new Builder()
//             .forBrowser("chrome")
//             .setChromeOptions(options)
//             .build();
//         console.log("WebDriver initialized successfully");
//         return driver;
//     } catch (error) {
//         console.error("Error initializing WebDriver:", error);
//         throw error;
//     }
// }

// initializeWebDriver()
//     .then(driver => {
//         // Use the initialized WebDriver
//         // Perform actions such as navigating to a URL, clicking elements, etc.
//         // Example:
//         // return driver.get('https://example.com');
//     })
//     .catch(error => {
//         // Handle any errors that occur during WebDriver initialization
//         console.error('Error occurred during WebDriver initialization:', error);
//     });


async function runTests() {
    try {
        await driver.get("http://localhost:3000");
        
        await formTests(driver);
    } catch(error) {
        console.error("Error running tests: ", error);
    } finally {
        if (driver) {
            await driver.quit();
        }
    }
}

runTests();