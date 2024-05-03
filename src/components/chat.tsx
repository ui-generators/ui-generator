import React, { useState, useEffect, FormEvent } from "react";
import {
    Stack, IStackTokens, TextField, DefaultButton, PrimaryButton,
    CommandBarButton,
} from '@fluentui/react';
import { Data, userName, workerName } from '@/constants/data';
import { client } from '@/constants/api';
import { useAppDispatch, useAppSelector } from '@/lib/hooks';
import { addChatHistory } from '@/lib/features/result/chat';
import { getSystemPrompt } from '@/app/prompt';
import { useAuth } from '@clerk/nextjs';
import { useRouter } from "next/navigation";


// Define styles for the chat window
const chatWindowStyle = {
    width: "500px",
    height: "800px",
    backgroundColor: "lightgray",
    border: "1px solid #000",
    overflow: "scroll",
};

// Define stack tokens for Fluent UI Stack component
const stackTokens: IStackTokens = { childrenGap: 10 };

// Define the Chat component
const Chat: React.FC<{ onChangeCode: (code: string) => void, onChangeUrl: (url: string) => void, code: string, useBootstrap: boolean }> = ({ onChangeCode, onChangeUrl, code, useBootstrap }) => {
  const [hasStyle, setHasStyle] = useState<boolean>(false);
  const [userInput, setUserInput] = useState<string>("");
  const [enterLoading, setEnterLoading] = useState<boolean>(false);
  const [showChatWindow, setShowChatWindow] = useState<boolean>(false);
  const router = useRouter();

  // Get the current user
  const { userId, isLoaded } = useAuth();

  // Check if the user is logged in
  if (!userId) {
    return (<><div>404 Error</div></>)
  }

  // Get the dispatch function from the Redux store
  const dispatch = useAppDispatch();

  // Get the chat history from the Redux store
  const data = useAppSelector((state) => state.chat.chatHistory);

  // Define the event handler for the user input change event
  const onChangeUserInput = (
    event: FormEvent<HTMLInputElement | HTMLTextAreaElement>,
    newValue: string | undefined
  ) => {
    setUserInput(newValue || "");
  };

  // Define the event handler for the enter button click event
  const onClickEnter = async () => {
    // Create a user message object
    const userMessage: Data = {
      sender: userName,
      message: userInput,
    };

    // Create a payload object for the user message
    const userPayload = {
      chatMessage: userMessage,
    };

    // Dispatch an action to add the user message to the chat history
    dispatch(addChatHistory(userPayload));
    // Set the enter button to loading state
    setEnterLoading(true);
    // Clear the user input
    setUserInput(""); // Clear user input

    // Send the system prompt, code, and user input to the API client and get the response
    const response = await client.iterativePrompt(
      getSystemPrompt(useBootstrap) + code + userInput
    );
    // Set the enter button to non-loading state
    setEnterLoading(false);

    // Create a worker message object
    const workerMessage: Data = {
      sender: workerName,
      message: response,
    };

    // Create a payload object for the worker message
    const workerPayload = {
      chatMessage: workerMessage,
    };

    // Dispatch an action to add the worker message to the chat history
    dispatch(addChatHistory(workerPayload));
    // Update the code with the response
    onChangeCode(response);

    // Create a new Blob object representing the response as text/html
    const blob = new Blob([response], { type: "text/html" });

    const query = userInput;
    

    try {
      const body = { userId, query, code };
      await fetch(`/api/interface`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(body),
      });

      router.push("/");
    } catch (error) {
      console.error(error);
    }
    
    // Create a URL representing the Blob object
    const url = URL.createObjectURL(blob);
    // Update the url with the new URL
    onChangeUrl(url);
  };

  // Define the event handler for the clear button click event
  const onClickClear = () => {
    // Clear the user input
    setUserInput("");
  };

  // Define the event handler for the chat window toggle event
  const onToggleChatWindow = (windowOpen: boolean) => {
    // Update the showChatWindow state with the new window open state
    setShowChatWindow(windowOpen);
  };

  // Define a useEffect hook that sets the hasStyle state to true when the component mounts
  useEffect(() => {
    setHasStyle(true);
  }, []);

    // Render the Chat component
  return (
    <div>
      {hasStyle && (
        <div
          style={{
            position: "fixed",
            bottom: "20px",
            right: "20px",
            overflowY: "auto",
          }}
        >
          {showChatWindow ? (
            <CommandBarButton
              text="Close Chat"
              onClick={() => onToggleChatWindow(false)}
            />
          ) : (
            <CommandBarButton
              text="Open Chat"
              onClick={() => onToggleChatWindow(true)}
            />
          )}
          {showChatWindow && (
            <div style={chatWindowStyle}>
              {data.map((item, index) => {
                const sender = item?.sender;
                const message = item?.message;
                if (sender?.length > 0 && message?.length > 0) {
                  return (

                    
                    <Stack key={`message-${index}`}>
                      <div style={{ fontWeight: "bold", marginBottom: "15px" }}>
                        {sender}
                      </div>
                      <div style={{ marginBottom: "40px" }}>{message}</div>
                    </Stack>
                  );
                }
                return null;
              })}
            </div>
          )}
          <Stack horizontal tokens={stackTokens} style={{ width: "500px" }}>
            <TextField
              multiline
              resizable={false}
              styles={{
                root: { width: "100%" }, // Explicitly set 100% width
              }}
              value={userInput ?? ""}
              onChange={onChangeUserInput}
            />
            <Stack>
              <PrimaryButton
                text={enterLoading ? "Loading..." : "Enter"}
                onClick={onClickEnter}
              />
              <DefaultButton text="Clear" onClick={onClickClear} />
            </Stack>
          </Stack>
        </div>
      )}
    </div>
  );
}

export default Chat;
