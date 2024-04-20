import { FormInput } from '../components/form';

export function generatePrompt(formInput: FormInput): string {
    return `
    Create a webpage using HTML and CSS with user-defined specifications. Users will input their desired webpage characteristics through a form, and the app will generate the corresponding webpage code based on these inputs.
    
    **Specifications for the Generated Webpage:**
    1. **Background Color:** The webpage should use a background color that matches the user's chosen color scheme. Use the input ${formInput.colorScheme} for this purpose.
    2. **Text Elements:**
       - An \`<h1>\` element displaying the text ${formInput.pageTitle} for the page title.
       - A \`<p>\` element containing the text ${formInput.content} for the main content.
    3. **Layout and Structure:** Arrange the content according to ${formInput.layoutStructure}, ensuring the layout aligns with the specified structure and content requirements.
    4. **Purpose:** The design should cater specifically to ${formInput.usage}, considering the intended use of the webpage.
    5. **Additional Information:** Incorporate ${formInput.additionalInfo} into the design, ensuring it complements the overall usability and aesthetic of the webpage.
    
    **Output Requirements:**
    - Generate the HTML and CSS code for the webpage. Ensure that the code reflects all user inputs and is designed to be visually appealing and user-friendly.
    - Output the code for both HTML and CSS, but avoid displaying any extraneous information or acknowledgments in the output.
    
    **Note:** Always adapt the placement and styling of content dynamically based on the nature of the content and the specified layout.
    `;
}