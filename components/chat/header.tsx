import { Button } from "@/components/ui/button";
import { EraserIcon } from "lucide-react";
import Image from "next/image";
import { CHAT_HEADER, CLEAR_BUTTON_TEXT } from "@/configuration/ui";
import { AI_NAME } from "@/configuration/identity";
import { motion } from "framer-motion";

export const AILogo = () => (
  <motion.div
    whileHover={{ scale: 1.05 }}
    transition={{ type: "spring", stiffness: 300, damping: 15 }}
    className="w-12 h-12 relative"
  >
    <Image src="/ai-logo.png" alt={AI_NAME} width={48} height={48} />
    <div className="w-2 h-2 rounded-full bg-green-500 absolute -bottom-0.5 -right-0.5"></div>
  </motion.div>
);

export default function ChatHeader({
  clearMessages,
}: {
  clearMessages: () => void;
}) {
  return (
    <div className="z-10 flex justify-center items-center fixed top-0 w-full p-5 bg-white shadow-[0_10px_15px_-3px_rgba(255,255,255,1)]">
      <div className="flex flex-col sm:flex-row items-center w-full">
        {/* left spacer only on desktop */}
        <div className="hidden sm:block w-[100px] shrink-0"></div>

        {/* center logo & title */}
        <div className="flex-1 flex justify-center items-center gap-2">
          <AILogo />
          <p>{CHAT_HEADER}</p>
        </div>

        {/* clear button: pushed down on mobile, inline on desktop */}
        <div className="w-auto sm:w-[100px] flex justify-end items-center mt-2 sm:mt-0">
          <motion.div
            whileHover={{ scale: 1.05 }}
            transition={{ type: "spring", stiffness: 300, damping: 20 }}
          >
            <Button
              onClick={clearMessages}
              className="gap-2 shadow-sm"
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
