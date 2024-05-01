// Reference: https://hix.dev/tutorials/react-next-js/end-to-end-tests-with-selenium
import selenium from "selenium-webdriver";
import formTests from "./form.mjs";

const { Builder } = selenium;
const chrome = selenium.chrome;

const options = new chrome.Options();
options.addArguments("--headless");

const driver = new Builder()
    .forBrowser("chrome")
    .setChromeOptions(options)
    .build();

(async function example() {
    try {
        await driver.get("http://localhost:3000");
        formTests(driver);
    } finally {
        // Teardown
        await driver.quit();
    }
})();