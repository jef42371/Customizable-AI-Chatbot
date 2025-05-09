"use client";

import { Button } from "@/components/ui/button";
import { EraserIcon } from "lucide-react";
import Image from "next/image";
import { CHAT_HEADER, CLEAR_BUTTON_TEXT } from "@/configuration/ui";
import { AI_NAME } from "@/configuration/identity";
import { motion } from "framer-motion";
import { ThemeToggle } from "@/components/ThemeToggle";

export const AILogo = () => (
  <motion.div
    whileHover={{ scale: 1.05 }}
    transition={{ type: "spring", stiffness: 300, damping: 15 }}
    className="w-12 h-12 relative"
  >
    <Image src="/ai-logo.png" alt={AI_NAME} width={48} height={48} />
    <div className="w-2 h-2 rounded-full bg-green-500 absolute -bottom-0.5 -right-0.5" />
  </motion.div>
);

export default function ChatHeader({
  clearMessages,
}: {
  clearMessages: () => void;
}) {
  return (
    <div className="z-10 fixed top-0 w-full p-5 bg-background shadow-md dark:shadow-lg">
      <div className="flex flex-col sm:flex-row items-center w-full">
        {/* logo & title: center on mobile, left on desktop */}
        <div className="flex-1 flex justify-center sm:justify-start items-center gap-2">
          <AILogo />
          <p className="text-lg font-medium">{CHAT_HEADER}</p>
        </div>

        {/* controls: theme toggle + clear */}
        <div className="flex items-center space-x-3 mt-2 sm:mt-0 w-auto sm:w-[100px] justify-end">
          <ThemeToggle />

          <motion.div
            whileHover={{ scale: 1.05 }}
            transition={{ type: "spring", stiffness: 300, damping: 20 }}
          >
            <Button
              onClick={clearMessages}
              className="gap-2"
              variant="outline"
              size="sm"
            >
              <EraserIcon className="w-4 h-4" />
              <span>{CLEAR_BUTTON_TEXT}</span>
            </Button>
          </motion.div>
        </div>
      </div>
    </div>
  );
}
