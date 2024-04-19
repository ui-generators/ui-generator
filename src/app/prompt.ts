import { FormInput } from '../components/form';

export function generatePrompt(formInput: FormInput): string {
    return `Generate HTML and CSS for a webpage with the following specifications:
    Color Scheme: ${formInput.colorScheme},
    Page Title: ${formInput.pageTitle},
    Content: ${formInput.content}.
    Please include CSS that makes the body font Arial and adds a footer with the text 'Third link here...'.`;
}