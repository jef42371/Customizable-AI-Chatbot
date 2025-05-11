"use client";

import { useState, useEffect } from "react";
import { ClipboardIcon, CheckIcon } from "lucide-react";
import { motion } from "framer-motion";
import Image from "next/image";

import { DisplayMessage } from "@/types";
import { Formatting } from "./formatting";
import Loading from "./loading";
import { LoadingIndicator } from "@/types";
import { AI_NAME } from "@/configuration/identity";

/**
 * This file contains the ChatMessages component which is used to display
 * the chat messages. It includes user messages, assistant messages,
 * and a loading indicator. It also includes a copy button for the assistant's
 * messages and an empty state when there are no messages yet.
 *
 * @file components/chat/messages.tsx
 * @author Son Nguyen
 * @license MIT
 * @version 1.0.0
 * @date 2025-05-11
 */

/**
 * CopyButton component that allows users to copy the message content
 * to the clipboard. It shows a check icon when the message is copied.
 *
 * @param text - The text to be copied
 */
function CopyButton({ text }: { text: string }) {
  const [copied, setCopied] = useState(false);

  useEffect(() => {
    if (copied) {
      const t = setTimeout(() => setCopied(false), 3000);
      return () => clearTimeout(t);
    }
  }, [copied]);

  const handleCopy = async () => {
    try {
      await navigator.clipboard.writeText(text);
      setCopied(true);
    } catch {
      /* optional fallback */
    }
  };

  return (
    <button
      onClick={handleCopy}
      aria-label="Copy message"
      className="p-1 rounded-full hover:bg-muted/30 focus:outline-none"
    >
      {copied ? (
        <CheckIcon className="w-4 h-4 text-green-500" />
      ) : (
        <ClipboardIcon className="w-4 h-4 text-muted-foreground" />
      )}
    </button>
  );
}

/**
 * AILogo component that displays the AI logo.
 */
function AILogo() {
  return (
    <motion.div
      whileHover={{ scale: 1.05 }}
      transition={{ type: "spring", stiffness: 300, damping: 15 }}
      className="w-9 h-9"
    >
      <Image src="/ai-logo.png" alt={AI_NAME} width={36} height={36} />
    </motion.div>
  );
}

/**
 * EmptyMessages component that displays a message when there are no chat messages yet.
 */
function EmptyMessages() {
  return (
    <div className="flex flex-col flex-1 p-1 gap-3 justify-center items-center">
      <p className="text-muted-foreground">
        Ask a question to start the conversation
      </p>
    </div>
  );
}

/**
 * UserMessage component that displays the user's message.
 *
 * @param message - The message object containing the content and role
 */
function UserMessage({ message }: { message: DisplayMessage }) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.3 }}
      className="flex items-end justify-end gap-1 py-1"
    >
      <motion.div
        whileHover={{ scale: 1.02 }}
        transition={{ type: "spring", stiffness: 300, damping: 20 }}
        className="px-3 py-1 rounded-2xl shadow-sm hover:shadow-md transition-shadow duration-300
                   bg-primary text-primary-foreground max-w-[60%]"
      >
        {message.content}
      </motion.div>
      {/* Copy button removed for user messages */}
    </motion.div>
  );
}

/**
 * AssistantMessage component that displays the assistant's message.
 *
 * @param message - The message object containing the content and role
 */
function AssistantMessage({ message }: { message: DisplayMessage }) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.3 }}
      className="flex items-start justify-start gap-1 py-1"
    >
      <div className="w-9 flex items-end">
        <AILogo />
      </div>
      <motion.div
        whileHover={{ scale: 1.02 }}
        transition={{ type: "spring", stiffness: 300, damping: 20 }}
        className="px-3 py-1 rounded-2xl shadow-sm hover:shadow-md transition-shadow duration-300
                   bg-secondary text-secondary-foreground max-w-[60%]"
      >
        <Formatting message={message} />
      </motion.div>
      <CopyButton text={message.content} />
    </motion.div>
  );
}

/**
 * ChatMessages component that displays the chat messages.
 * It includes user messages, assistant messages, and a loading indicator.
 *
 * @param messages - The array of chat messages
 * @param indicatorState - The current state of the loading indicators
 */
export default function ChatMessages({
  messages,
  indicatorState,
}: {
  messages: DisplayMessage[];
  indicatorState: LoadingIndicator[];
}) {
  const showLoading =
    indicatorState.length > 0 &&
    messages.length > 0 &&
    messages[messages.length - 1].role === "user";

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.5 }}
      className="flex flex-col flex-1 p-1 gap-3"
    >
      <div className="h-[60px]" />
      {messages.length === 0 ? (
        <EmptyMessages />
      ) : (
        messages.map((m, i) => (
          <motion.div
            key={i}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.3, delay: i * 0.1 }}
          >
            {m.role === "user" ? (
              <UserMessage message={m} />
            ) : (
              <AssistantMessage message={m} />
            )}
          </motion.div>
        ))
      )}
      {showLoading && <Loading indicatorState={indicatorState} />}
      <div className="h-[129px]" />
    </motion.div>
  );
}
