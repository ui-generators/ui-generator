// Reference: https://hix.dev/tutorials/react-next-js/end-to-end-tests-with-selenium
import formTests from "./form.js";
import signInTest from "./signin.js";
import resultPageTests from "./result.js";
import { Builder } from "selenium-webdriver";
import chrome from "selenium-webdriver/chrome.js";

const options = new chrome.Options();
options.addArguments("--headless");

const driver = new Builder()
    .forBrowser("chrome")
    .setChromeOptions(options)
    .build();

async function runTests() {
    try {
        await driver.get("http://localhost:3000");

        await signInTest(driver);
        
        await formTests(driver);

        await resultPageTests(driver);
    } catch(error) {
        
        console.error("Error running tests: ", error);

    } finally {
        if (driver) {
            await driver.quit();
        }
    }
}

runTests();