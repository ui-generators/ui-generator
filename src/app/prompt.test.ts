import { getSystemPrompt, getWebpagePrompt, getVariationWebPrompt } from './prompt';
import { FormInput } from '../components/form';

describe('Prompt generation tests', () => {
    describe('getSystemPrompt', () => {
        it('should include Bootstrap in the prompt if useBootstrap is true', () => {
            const result = getSystemPrompt(true);
            expect(result).toContain('and the CSS Bootstrap framework');
        });

        it('should not include Bootstrap in the prompt if useBootstrap is false', () => {
            const result = getSystemPrompt(false);
            expect(result).not.toContain('and the CSS Bootstrap framework');
        });
    });

    describe('getWebpagePrompt', () => {
        const mockFormInput: FormInput = {
            colorScheme: 'blue',
            pageTitle: 'Test Page',
            content: 'Welcome to the test page',
            layoutStructure: 'single column',
            usage: 'demo',
            additionalInfo: 'no ads',
            useBootstrap: ''
        };

        it('should generate correct webpage prompt based on form input', () => {
            const result = getWebpagePrompt(mockFormInput);
            expect(result).toContain('blue');
            expect(result).toContain('Test Page');
            expect(result).toContain('Welcome to the test page');
            expect(result).toContain('single column');
            expect(result).toContain('demo');
        });
    });

    describe('getVariationWebPrompt', () => {
        const mockFormInput: FormInput = {
            colorScheme: 'green',
            pageTitle: 'Updated Test Page',
            content: 'Updated content here',
            layoutStructure: 'flexible',
            usage: 'public',
            additionalInfo: 'interactive elements',
            useBootstrap: ''
        };

        it('should encourage creativity in the prompt for webpage variations', () => {
            const result = getVariationWebPrompt(mockFormInput);
            expect(result).toContain('feel free to be creative');
            expect(result).toContain('flexible');
            expect(result).toContain('Updated Test Page');
            expect(result).toContain('public');
        });
    });
});
