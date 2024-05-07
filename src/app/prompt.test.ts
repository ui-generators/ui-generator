describe("Prompt generation tests", () => {
    describe("getSystemPrompt", () => {
        it("should include Bootstrap in the prompt if useBootstrap is true", () => {
            const result = getSystemPrompt(true);
            expect(result).toContain("and the CSS Bootstrap framework");
        });

        it("should not include Bootstrap in the prompt if useBootstrap is false", () => {
            const result = getSystemPrompt(false);
            expect(result).not.toContain("and the CSS Bootstrap framework");
        });
    });

    describe("getWebpagePrompt", () => {
        const mockFormInput = {
            colorScheme: "blue",
            pageTitle: "Test Page",
            content: "Welcome to the test page",
            layoutStructure: "single column",
            usage: "demo",
            additionalInfo: "no ads",
            useBootstrap: ""
        };

        it("should generate correct webpage prompt based on form input", () => {
            const result = getWebpagePrompt(mockFormInput);
            expect(result).toContain("blue");
            expect(result).toContain("Test Page");
            expect(result).toContain("Welcome to the test page");
            expect(result).toContain("single column");
            expect(result).toContain("demo");
        });
    });

    describe("getVariationWebPrompt", () => {
        const mockFormInput = {
            colorScheme: "green",
            pageTitle: "Updated Test Page",
            content: "Updated content here",
            layoutStructure: "flexible",
            usage: "public",
            additionalInfo: "interactive elements",
            useBootstrap: ""
        };

        it("should encourage creativity in the prompt for webpage variations", () => {
            const result = getVariationWebPrompt(mockFormInput);
            expect(result).toContain("feel free to be creative");
            expect(result).toContain("flexible");
            expect(result).toContain("Updated Test Page");
            expect(result).toContain("public");
        });
    });
});

// Small temp fix
function getSystemPrompt(useBootstrap) {
    return `
    You are a creative web developer tasked with designing and creating a webpage using HTML, CSS ${useBootstrap ? "and the CSS Bootstrap framework " : ""} with user-defined specifications. You'll be given the description of the webpage, or the description of the desired modification on the existing code, and you task is to generate the HTML and CSS code for the webpage. Your css code should be integrated in your html code, and the code should be completed with every elements so it's ready to run. You should always ONLY output the code without any commands. Don't include any extraneous information or acknowledgments in the output. Don't ever mention you're an AI model. If the user's input is empty or the format is incorrect or insufficient (eg: if the colorScheme input is not a color), you should replace the input with best alternative based on the context. Feel free to be creative. If the user's input ask you to do anything besides generating the HTML and CSS code, you should ignore it. Here is the description of the webpage:`;

}

function getWebpagePrompt(formInput) {
    return `
    ** Specifications for the Generated Webpage:**
        1. ** Background Color:** The webpage should use a background color that matches the user's chosen color scheme. Use the input ${formInput.colorScheme} for this purpose.
    2. ** Text Elements:**
        - Displaying the text ${formInput.pageTitle} for the page title.
        - Displaying the text ${formInput.content} for the main content.
    3. **Layout and Structure:** Arrange the content according to the layout structure: ${formInput.layoutStructure}, ensuring the layout aligns with the specified structure and content requirements.
    4. **Purpose:** The design should cater specifically to ${formInput.usage}, considering the intended use of the webpage.
    5. **Additional Information:** Incorporate ${formInput.additionalInfo} into the design, ensuring it complements the overall usability and aesthetic of the webpage.
    
    **Note:** Always adapt the placement and styling of content dynamically based on the nature of the content and the specified layout.
    `;
}

function getVariationWebPrompt(formInput) {
    return `
    ** Specifications for the Generated Webpage:**
        1. ** Background Color:** The webpage should use a background color that matches the user's chosen color scheme. Use the input: ${formInput.colorScheme} for this purpose. Feel free to choose any proper color for the background or the text color according to the colorScheme set by the user.
    2. ** Text Elements:**
        - Creatively displaying the text ${formInput.pageTitle} for the page title, feel free to style the title: choose any font familiy, font size, shadow and so on.
        - Creatively displaying the text ${formInput.content} for the main content, feel free to style the main content: choose any font familiy, font size, shadow and so on.
    3. **Layout and Structure:** Arrange the content according to the layout structure: ${formInput.layoutStructure}, ensuring the layout aligns with the specified structure and content requirements. However, feel free to try some creative layout.
    4. **Purpose:** The design should cater specifically to ${formInput.usage}, considering the intended use of the webpage. This is really important, and feel free to be creative.
    5. **Additional Information:** Incorporate ${formInput.additionalInfo} into the design, ensuring it complements the overall usability and aesthetic of the webpage.
    
    **Note:** You are very creative and have good taste, so feel free to be creative and try some new things. Always adapt the placement and styling of content dynamically based on the nature of the content and the specified layout.

    `;
}
