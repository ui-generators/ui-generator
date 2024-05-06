import selenium from "selenium-webdriver";

const { By, until } = selenium;

const formTests = async (driver) => {
    try {
        await driver.wait(
            until.elementLocated(By.xpath("//*[contains(text(), 'Page Title')]")),
            10000
        );
    
        // Find input fields and give them values
        // Page title
        const pageTitleLabel = await driver.findElement(By.xpath("//label[text()='Page Title']"));
        const pageTitleInputField = await pageTitleLabel.getAttribute("for");
        const pageTitleInput = await driver.findElement(By.id(pageTitleInputField));
        await pageTitleInput.sendKeys("My Page Title");

        console.log("Entered page title");
    
        // Color scheme preferences
        const colorSchemeLabel = await driver.findElement(By.xpath("//label[text()='Color Scheme Preferences']"));
        const colorSchemeLabelId = await colorSchemeLabel.getAttribute("id");
        const colorSchemeSelectorId = colorSchemeLabelId.split("-")[0];
        const colorSchemeDropdown = await driver.findElement(By.id(colorSchemeSelectorId));
        await colorSchemeDropdown.click();
        const colorSchemeToSelect = await driver.findElement(By.xpath("//span[text()='Light']"));
        await colorSchemeToSelect.click();

        console.log("Selected color scheme format");
    
        // Layout
        const layoutLabel = await driver.findElement(By.xpath("//label[text()='Layout Structure & Sections']"));
        const layoutField = await layoutLabel.getAttribute("for");
        const layoutInput = await driver.findElement(By.id(layoutField));
        await layoutInput.sendKeys("4 sections");

        console.log("Entered layout");
    
        // Content
        const contentLabel = await driver.findElement(By.xpath("//label[text()='Content']"));
        const contentField = await contentLabel.getAttribute("for");
        const contentInput = await driver.findElement(By.id(contentField));
        // Reference: copied from our presentation slides
        await contentInput.sendKeys(`We built a next.js web application with frontend and prompt generation written in React and TypeScript
        We also published an NPM package for the API client, which communicates with GPT to generate results
        We implemented a form to collect user inputs and another page to display the generated web page and code, and a chat window to prompt GPT to refine the web page
        We also enhanced the UI with some animation
        `);

        console.log("Entered content");
    
        // Usage type
        const usageTypeLabel = await driver.findElement(By.xpath("//label[text()='Usage']"));
        const usageSelector = await usageTypeLabel.getAttribute("id");
        const usageTypeLabelId = usageSelector.split("-")[0];
        const usageDropdown = await driver.findElement(By.id(usageTypeLabelId));
        await usageDropdown.click();
        const usageToSelect = await driver.findElement(By.xpath("//span[text()='Personal Web Page']"));
        await usageToSelect.click();

        console.log("Selected usage");
    
        // Bootstrap
        const bootstrapLabel = await driver.findElement(By.xpath("//label[text()='Bootstrap']"));
        const bootstrapSelector = await bootstrapLabel.getAttribute("id");
        const bootstrapSelectorId = bootstrapSelector.split("-")[0];
        const bootstrapDropdown = await driver.findElement(By.id(bootstrapSelectorId));
        await bootstrapDropdown.click();
        const bootstrapToSelect = await driver.findElement(By.xpath("//span[text()='Yes']"));
        await bootstrapToSelect.click();

        console.log("Selected bootstrap");
    
        // Additional information
        const additionalInfoLabel = await driver.findElement(By.xpath("//label[text()='Additional Information']"));
        const additionalInfoField = await additionalInfoLabel.getAttribute("for");
        const additionalInfoInput = await driver.findElement(By.id(additionalInfoField));
        await additionalInfoInput.sendKeys("");

        console.log("Added additional info");
    
        // Click submit button
        const generateButton = await driver.findElement(By.xpath("//button//span[.='Generate Code']"));
        await generateButton.click();
    } catch (error) {
        console.error("Error running form tests: ", error);
    }
};

export default formTests;