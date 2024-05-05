import selenium from "selenium-webdriver";
import assert from "assert";

const { By, Select } = selenium;

const formTests = async (driver) => {
    // Find input fields and give them values
    // Page title
    const pageTitleLabel = await driver.findElement(By.xpath("//label[text()='Page Title']"));
    const pageTitleInputField = await pageTitleLabel.getAttribute("for");
    // console.log("pageTitleInputField", pageTitleInputField);
    const pageTitleInput = await driver.findElement(By.id(pageTitleInputField));
    // console.log("pageTitleInput", pageTitleInput);
    await pageTitleInput.sendKeys("My Page Title");

    // Color scheme preferences
    const colorSchemeLabel = await driver.findElement(By.xpath("//label[text()='Color Scheme Preferences']"));
    const colorSchemeSelector = await colorSchemeLabel.getAttribute("for");
    const colorSchemeDropdown = await driver.findElement(By.id(colorSchemeSelector));
    const colorSchemeSelect = new Select(colorSchemeDropdown);
    await colorSchemeSelect.selectByVisibleText("Light");
    const selectedOption = await colorSchemeSelect.getFirstSelectedOption();
    if (selectedOption == null) {
        // console.log("selectedOption is null");
        throw new Error("Cannot get first select option for color scheme preference");
    }
    const selectedText = await selectedOption.getText();
    assert.strictEqual(selectedText, "Light");
    await colorSchemeDropdown.sendKeys("light");

    // Layout
    const layoutLabel = await driver.findElement(By.xpath("//label[text()='Layout Structure & Sections']"));
    const layoutField = await layoutLabel.getAttribute("for");
    const layoutInput = await driver.findElement(By.id(layoutField));
    await layoutInput.sendKeys("4 sections");

    // Content
    const contentLabel = await driver.findElement(By.xpath("//label[text()='Content']"));
    const contentField = await contentLabel.getAttribute("for");
    const contentInput = await driver.findElement(By.id(contentField));
    // Reference: our presentation slides
    await contentInput.sendKeys(`We built a next.js web application with frontend and prompt generation written in React and TypeScript
    We also published an NPM package for the API client, which communicates with GPT to generate results
    We implemented a form to collect user inputs and another page to display the generated web page and code, and a chat window to prompt GPT to refine the web page
    We also enhanced the UI with some animation
    `);

    // Usage type
    const usageTypeLabel = await driver.findElement(By.xpath("//label[text()='Usage']"));
    const usageSelector = await usageTypeLabel.getAttribute("for");
    const usageDropdown = await driver.findElement(By.id(usageSelector));
    const usageSelect = new Select(usageDropdown);
    await usageSelect.selectByVisibleText("Personal Web Page");
    const selectedUsageOption = await usageSelect.getAllSelectedOptions();
    if (selectedUsageOption == null) {
        // console.log("selectedUsageOption is null");
        throw new Error("Cannot get all select options for usage");
    }
    const selectedUsageText = await selectedUsageOption[1].getText();
    assert.strictEqual(selectedUsageText, "Personal Web Page");
    await usageDropdown.sendKeys("personalWebPage");

    // Bootstrap
    const bootstrapLabel = await driver.findElement(By.xpath("//label[text()='Bootstrap']"));
    const bootstrapSelector = await bootstrapLabel.getAttribute("for");
    const bootstrapDropdown = await driver.findElement(By.id(bootstrapSelector));
    const bootstrapSelect = new Select(bootstrapDropdown);
    await bootstrapSelect.selectByVisibleText("Yes");
    const selectedBootstrapOption = await bootstrapSelect.getFirstSelectedOption();
    if (selectedBootstrapOption == null) {
        // console.log("selectedBootstrapOption is null");
        throw new Error("Cannot get first select options for bootstrap");
    }
    const selectedBootstrapText = await selectedBootstrapOption.getText();
    assert.strictEqual(selectedBootstrapText, "Yes");
    await bootstrapDropdown.sendKeys("yes");

    // Additional information
    const additionalInfoLabel = await driver.findElement(By.xpath("//label[text()='Additional Information']"));
    const additionalInfoField = await additionalInfoLabel.getAttribute("for");
    const additionalInfoInput = await driver.findElement(By.id(additionalInfoField));
    await additionalInfoInput.sendKeys("");

    // Click submit button
    const generateButton = await driver.findElement(By.xpath("//li[text()='Generate Code']"));
    await generateButton.click();
};

export default formTests;