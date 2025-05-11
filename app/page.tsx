"use client";

import ChatInput from "@/components/chat/input";
import ChatMessages from "@/components/chat/messages";
import useApp from "@/hooks/use-app";
import ChatHeader from "@/components/chat/header";

/**
 * This file contains the main chat component that renders the chat
 * interface. It includes the chat header, messages, and input
 * components. It also handles the state and functionality of the chat
 * application.
 *
 * @file app/page.tsx
 * @author Son Nguyen
 * @license MIT
 * @version 1.0.0
 * @date 2025-05-11
 */

/**
 * Chat component that renders the chat interface
 */
export default function Chat() {
  const {
    messages,
    handleInputChange,
    handleSubmit,
    input,
    isLoading,
    indicatorState,
    clearMessages,
  } = useApp();

  return (
    <div className="w-screen">
      <ChatHeader clearMessages={clearMessages} />
      <div className="flex justify-center items-center h-screen">
        <div className="flex flex-col w-screen h-full px-5">
          <ChatMessages messages={messages} indicatorState={indicatorState} />
        </div>
      </div>
      <ChatInput
        handleInputChange={handleInputChange}
        handleSubmit={handleSubmit}
        input={input}
        isLoading={isLoading}
      />
    </div>
  );
}
