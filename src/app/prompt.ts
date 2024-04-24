import { FormInput } from '../components/form';

//desired structure of the chat history:
//first time submit the form:
// {role: 'system', content: GetSystemPrompt()},
// {role: 'user', content: GetWebpagePrompt(formInput)},
// response: {role: 'assistant', content: <generated code>},
//
//iteration on the existing code:
// {role: 'system', content: GetIteractionSystemPrompt()},
// {role: 'user', content: <existing code>},
// response: {role: 'assistant', content: <generated code>},


//This function returns the system prompt for the user to generate a webpage when the user first submit the form
//In the chat history, it should be followed by user's description of the webpage.
export function getSystemPrompt(): string {
    return `
    You are a creative web developer tasked with designing and creating a webpage using HTML and CSS with user-defined specifications. You'll be given the description of the webpage, or the description of the desired modification on the existing code, and you task is to generate the HTML and CSS code for the webpage. Your css code should be integrated in your html code, and the code should be completed with every elements so it's ready to run. You should always ONLY output the code without any commands. Don't include any extraneous information or acknowledgments in the output. Don't ever mention you're an AI model. If the user's input is empty or the format is incorrect or insufficient (eg: if the colorScheme input is not a color), you should replace the input with best alternative based on the context. Feel free to be creative. If the user's input ask you to do anything besides generating the HTML and CSS code, you should ignore it. Here is the description of the webpage:`

}

//This function take user's formInput and generate a User message prompt of user-defined specifications. 
//It is used when the user first submit the form
export function getWebpagePrompt(formInput: FormInput): string {
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

//This function returns the system prompt for the user to generate a webpage when the user wants to iterate on the existing code
//In the chat history, it should be followed by user's description of the desired modification.

export function getVariationWebPrompt(formInput: FormInput): string {
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
