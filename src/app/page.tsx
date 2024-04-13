"use client";

import React, { useState } from 'react';
import Form, { FormInput } from '../components/form';


const Home: React.FC = () => {
  const [generatedCodes, setGeneratedCodes] = useState<string[]>([]);
  const [blobUrls, setBlobUrls] = useState<string[]>([]);

  const handleSubmit = async (formInput: FormInput): Promise<void> => {
    // doing simple generation using only some of the user inputs for placeholder purposes
    const baseCode = `<html><body style="background-color:${formInput.colorScheme};"><h1>${formInput.pageTitle}</h1><p>${formInput.content}</p></body></html>`;
    const variations = [
      baseCode,
      `${baseCode}<style>body {font-family: Arial;}</style>`,
      `${baseCode}<footer><p>Third link here...</p></footer>`
    ];
    setGeneratedCodes(variations);

    blobUrls.forEach(URL.revokeObjectURL);
    const newBlobUrls = variations.map(code => {
      const blob = new Blob([code], { type: 'text/html' });
      return URL.createObjectURL(blob);
    });
    setBlobUrls(newBlobUrls);
  };

  return (
    <div>
      <Form onSubmit={handleSubmit} />
      {blobUrls.map((url, index) => (
        <a key={index} href={url} target="_blank" rel="noopener noreferrer" style={{ display: 'block', margin: '10px' }}>
          Preview {index + 1} (New Tab)
        </a>
      ))}
    </div>
  );
};

export default Home;
