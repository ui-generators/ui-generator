import React, { useState } from 'react';
import { TextField, Dropdown, PrimaryButton, IDropdownOption, Stack, IStackTokens, IStackStyles } from '@fluentui/react';

export interface FormInput {
  pageTitle: string;
  colorScheme: string;
  layoutStructure: string;
  content: string;
  usage: string;
  additionalInfo: string;
}

// basic form
const Form: React.FC<{ onSubmit: (formInput: FormInput) => void }> = ({ onSubmit }) => {
  const [pageTitle, setPageTitle] = useState('');
  const [colorScheme, setColorScheme] = useState('');
  const [layoutStructure, setLayoutStructure] = useState('');
  const [content, setContent] = useState('');
  const [usage, setUsage] = useState('');
  const [additionalInfo, setAdditionalInfo] = useState('');

  const colorSchemeOptions: IDropdownOption[] = [
    { key: 'light', text: 'Light' },
    { key: 'dark', text: 'Dark' },
  ];

  const usageOptions: IDropdownOption[] = [
    { key: 'e-commerce', text: 'E-commerce' },
    { key: 'personalWebPage', text: 'Personal Web Page' },
  ];

  const stackTokens: IStackTokens = { childrenGap: 20 };
  const stackStyles: IStackStyles = { root: {width: '100%', maxWidth: 950, margin: '0 auto', padding: '20px', }};

  const handleGenerateCode = (): void => {
    onSubmit({pageTitle, colorScheme, layoutStructure,content, usage, additionalInfo});
  };

  return (
    <Stack tokens={stackTokens} styles={stackStyles}>
      <TextField label="Page Title" value={pageTitle} onChange={(_, newValue) => setPageTitle(newValue || '')} />
      <Dropdown
        label="Color Scheme Preferences"
        selectedKey={colorScheme}
        onChange={(_, option) => setColorScheme(option?.key as string)}
        placeholder="Select a Color Scheme"
        options={colorSchemeOptions}
      />
      <TextField
        label="Layout Structure & Sections"
        value={layoutStructure}
        onChange={(_, newValue) => setLayoutStructure(newValue || '')}
      />
      <TextField
        label="Content"
        multiline
        rows={3}
        value={content}
        onChange={(_, newValue) => setContent(newValue || '')}
      />
      <Dropdown
        label="Usage"
        selectedKey={usage}
        onChange={(_, option) => setUsage(option?.key as string)}
        placeholder="Select Usage Type"
        options={usageOptions}
      />
      <TextField
        label="Additional Information"
        multiline
        rows={3}
        value={additionalInfo}
        onChange={(_, newValue) => setAdditionalInfo(newValue || '')}
      />
      <PrimaryButton text="Generate Code" onClick={handleGenerateCode} style={{ marginTop: '20px' }} />
    </Stack>
  );
};

export default Form;
