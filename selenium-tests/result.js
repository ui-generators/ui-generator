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
        const openChatButton = await driver.findElement(By.xpath("//button[span/span/span[text()='Open Chat']]"));
        const textBox = await driver.findElement(By.xpath("//textarea[contains(@class, 'ms-TextField--unresizable')]"));
        const enterButton = await driver.findElement(By.xpath("//button[.='Enter']"));
        await driver.findElement(By.xpath("//button[.='Clear']"));

        await textBox.sendKeys("Test message...");
        await enterButton.click();
        await openChatButton.click();
        
        const refreshedPageElement = await driver.findElement(By.css("body"));
        const refreshedPageContent = await refreshedPageElement.getText();
        if (refreshedPageContent.includes("Test message...")) {
            console.log("Found the message sent");
        }

        console.log("Chat window is found");
    } catch (error) {
        console.error("Error running result page tests: ", error);
    }
};

export default formTests;