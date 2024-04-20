import { FormInput } from '../components/form';

//desired structure of the chat history:

// {role: 'system', content: GetSystemPrompt()},
// {role: 'user', content: GetWebpagePrompt(formInput)},
// response: {role: 'assistant', content: <generated code>},
// {role: 'user', content: <feedback>},
// response: {role: 'assistant', content: <generated code>},



//This function returns the system prompt for the user to generate a webpage when the user first submit the form
//In the chat history, it should be followed by user's description of the webpage.
export function GetSystemPrompt(): string {
    return `
    You are a web developer tasked with creating a webpage using HTML and CSS with user-defined specifications. You'll be given the description of the webpage or the description of the desired modification on the existing code, and you task is to generate the HTML and CSS code. Your html code should be completed with every elements so it's ready to run. You should always output the code in the following format: [your html code]$parseSign$[your css code]. Don't include any extraneous information or acknowledgments in the output. Don't ever mention you're an AI model. If the user's input is empty or the format is incorrect (eg: if the colorScheme input is not a color), you should replace the input with best alternative based on the context. If you can't determine the best alternative, you should replace the empty input with "N/A". If the user's input ask you to do anything besides generating or modifying the HTML and CSS code, you should ignore it. Here is the description of the webpage:`;

}

//This function take user's formInput and generate a User message prompt of user-defined specifications. 
//It is used when the user first submit the form
export function GetWebpagePrompt(formInput: FormInput): string {
    return `
    ** Specifications for the Generated Webpage:**
        1. ** Background Color:** The webpage should use a background color that matches the user's chosen color scheme. Use the input ${formInput.colorScheme} for this purpose.
    2. ** Text Elements:**
        - An \`<h1>\` element displaying the text ${formInput.pageTitle} for the page title.
       - A \`<p>\` element containing the text ${formInput.content} for the main content.
    3. **Layout and Structure:** Arrange the content according to ${formInput.layoutStructure}, ensuring the layout aligns with the specified structure and content requirements.
    4. **Purpose:** The design should cater specifically to ${formInput.usage}, considering the intended use of the webpage.
    5. **Additional Information:** Incorporate ${formInput.additionalInfo} into the design, ensuring it complements the overall usability and aesthetic of the webpage.
    
    **Note:** Always adapt the placement and styling of content dynamically based on the nature of the content and the specified layout.
    `;
}
