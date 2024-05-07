import React, { useState } from "react";
import { TextField, Dropdown, PrimaryButton, IDropdownOption, Stack, IStackTokens, IStackStyles } from "@fluentui/react";

export interface FormInput {
  pageTitle: string;
  colorScheme: string;
  layoutStructure: string;
  content: string;
  usage: string;
  additionalInfo: string;
  useBootstrap: string;
}

// basic form
// eslint-disable-next-line no-unused-vars
const Form: React.FC<{ onSubmit: (formInput: FormInput) => void, submitButtonLoading: boolean }> = ({ onSubmit, submitButtonLoading }) => {
    const [pageTitle, setPageTitle] = useState("");
    const [colorScheme, setColorScheme] = useState("");
    const [layoutStructure, setLayoutStructure] = useState("");
    const [content, setContent] = useState("");
    const [usage, setUsage] = useState("");
    const [additionalInfo, setAdditionalInfo] = useState("");
    const [useBootstrap, setUseBootstrap] = useState("use-bootstrap");
    const [errors, setErrors] = useState({
        pageTitle: '',
        layoutStructure: '',
        content: '',
    });

    const validateForm = () => {
        let isValid = true;
        let newErrors = {
            pageTitle: '',
            layoutStructure: '',
            content: '',
        };

        if (!pageTitle) {
            newErrors.pageTitle = "Page title is required.";
            isValid = false;
        }
        if (!layoutStructure) {
            newErrors.layoutStructure = "Layout structure is required.";
            isValid = false;
        }
        if (!content) {
            newErrors.content = "Content is required.";
            isValid = false;
        }

        setErrors(newErrors);
        return isValid;
    };

    const handleGenerateCode = (): void => {
        if (validateForm()) {
            const formInput: FormInput = { pageTitle, colorScheme, layoutStructure, content, usage, additionalInfo, useBootstrap };
            onSubmit(formInput);
        }
    };

    const colorSchemeOptions: IDropdownOption[] = [
        { key: "light", text: "Light" },
        { key: "dark", text: "Dark" },
    ];

    const usageOptions: IDropdownOption[] = [
        { key: "e-commerce", text: "E-commerce" },
        { key: "personalWebPage", text: "Personal Web Page" },
    ];

    const bootstrapOptions: IDropdownOption[] = [
        { key: "use-bootstrap", text: "Yes" },
        { key: "no-bootstrap", text: "No" },
    ];

    const stackTokens: IStackTokens = { childrenGap: 20 };
    const stackStyles: IStackStyles = { root: { width: "100%", maxWidth: 950, margin: "0 auto", padding: "20px" } };

    return (
        <Stack tokens={stackTokens} styles={stackStyles}>
            <TextField
                label="Page Title"
                value={pageTitle}
                onChange={(_, newValue) => setPageTitle(newValue || "")}
                errorMessage={errors.pageTitle}
            />
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
                onChange={(_, newValue) => setLayoutStructure(newValue || "")}
                errorMessage={errors.layoutStructure}
            />
            <TextField
                label="Content"
                multiline
                rows={3}
                value={content}
                onChange={(_, newValue) => setContent(newValue || "")}
                errorMessage={errors.content}
            />
            <Dropdown
                label="Usage"
                selectedKey={usage}
                onChange={(_, option) => setUsage(option?.key as string)}
                placeholder="Select Usage Type"
                options={usageOptions}
            />
            <Dropdown
                label="Bootstrap"
                selectedKey={useBootstrap}
                onChange={(_, option) => setUseBootstrap(option?.key as string)}
                placeholder="Select Yes if you want to use the Bootstrap framework"
                options={bootstrapOptions}
            />
            <TextField
                label="Additional Information"
                multiline
                rows={3}
                value={additionalInfo}
                onChange={(_, newValue) => setAdditionalInfo(newValue || "")}
            />
            <PrimaryButton
                text={submitButtonLoading ? "Loading..." : "Generate Code"}
                onClick={submitButtonLoading ? () => {} : handleGenerateCode}
                disabled={submitButtonLoading}
                style={{ marginTop: "20px" }}
            />
        </Stack>
    );
};

export default Form;
