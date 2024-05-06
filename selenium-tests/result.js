import selenium from "selenium-webdriver";

const { By, until } = selenium;

const formTests = async (driver) => {
    try {
        await driver.wait(
            until.elementLocated(By.xpath("//*[contains(text(), 'Webpage')]")),
            100000
        );

        const iframe = await driver.findElements(By.xpath("//iframe"));
        if (iframe) {
            console.log("Found embedded web page");
        }

        // Check the "Code" side of the toggle
        const toggleLabel = await driver.findElement(By.xpath("//label[text()='Webpage']"));
        const toggleId = await toggleLabel.getAttribute("for");
        const toggleButton = await driver.findElement(By.id(toggleId));
        await toggleButton.click();

        const pageElement = await driver.findElement(By.css("body"));
        const pageContent = await pageElement.getText();
        if (pageContent.includes("<html lang=\"en\">")) {
            console.log("Found HTML code");
        }

        // Find elements of the chat window
        await driver.findElement(By.xpath("//button[span/span/span[text()='Open Chat']]"));
        await driver.findElement(By.xpath("//div[contains(@class, 'ms-TextField-fieldGroup')]"));
        await driver.findElement(By.xpath("//button[.='Enter']"));
        await driver.findElement(By.xpath("//button[.='Clear']"));

        console.log("Chat window is found");
    } catch (error) {
        console.error("Error running result page tests: ", error);
    }
};

export default formTests;