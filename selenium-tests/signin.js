import selenium from "selenium-webdriver";
import fs from "fs";

const { By, until } = selenium;

const signInTest = async (driver) => {
    try {
        // Click on "Continue with Google"
        await driver.wait(until.elementLocated(By.css(".cl-socialButtonsBlockButton")), 10000);

        const continueWithGoogleButton = await driver.findElement(By.xpath("//button[normalize-space()='Continue with Google']"));

        await continueWithGoogleButton.click();

        await driver.wait(until.urlContains("https://accounts.google.com/"), 10000);
  
        const currentUrl = await driver.getCurrentUrl();
        if (currentUrl.includes("https://accounts.google.com/")) {
            console.log("On the Google accounts sign in page");
        } else {
            console.error("Failure to get the Google accounts sign in page");
        }

        // Log in via Google
        // Click on continue
        const pageElement = await driver.findElement(By.css("body"));

        const pageContent = await pageElement.getText();

        if (pageContent.includes("Sign in") && pageContent.includes("to continue to clerk.shared.lcl.dev")) {
            // Enter email address
            const emailInput = await driver.findElement(By.id("identifierId"));

            await emailInput.sendKeys("testuigenerator@gmail.com");

            const nextButton = await driver.findElement(By.xpath("//button[text()='Next']"));

            await driver.wait(until.elementIsVisible(nextButton), 10000); 

            await nextButton.click();

            console.log("Clicked next button");

            // On the second page, enter password
            const passwordInput = await driver.findElement(By.id("password"));

            await passwordInput.sendKeys("uigenerator2024!");

            console.log("Entered password");

            const nextButtonSecondPage = await driver.findElement(By.id("passwordNext"));

            await nextButtonSecondPage.click();

            console.log("Clicked next button");

            // Click on Continue
            const newPageElement = await driver.findElement(By.css("body"));

            const newPageContent = await newPageElement.getText();

            // Allow accesses if Google prompts us to
            if (newPageContent.includes("wants to access your Google Account")) {
                const allowButton = await driver.findElement(By.xpath("//button[text()='Allow']"));

                await driver.wait(
                    async () => {
                        const isDisabled = await allowButton.getAttribute("disabled");
                        return isDisabled === null;  // True if the attribute is null or not present
                    },
                    10000  // Timeout in milliseconds (10 seconds)
                );

                const isDisabled = await allowButton.getAttribute("disabled");

                console.log(isDisabled === null ? "Not disabled" : "Disabled");

                await allowButton.click();

                console.log("Allowed access");
            }
        } else {
            const screenshot = await driver.takeScreenshot();
            fs.writeFileSync("screenshot.png", screenshot, "base64");

            console.error("Failure to get the correct Sign In with Google account page");
        }
    } catch (error) {
        console.error("Error in sign in test", error);
    }

};

export default signInTest;